<template>
  <div class="page2-wrapper">
    <div class="page2-container">
      <!-- Left Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <h2 class="sidebar-title">Results</h2>
          </div>

          <div v-if="product1" class="product-info">
            <h3 class="product-name" v-html="product1.displayName"></h3>
            <p class="product-subtitle">{{ getProductSubtitle(product1.type) }}</p>
            <div class="questionnaire-count">
              <span class="count-label">Questionnaires</span>
              <div class="count-number">{{ formatCount(product1.count) }}</div>
            </div>
          </div>

          <div class="sidebar-divider"></div>

          <div v-if="product2" class="product-info">
            <h3 class="product-name" v-html="product2.displayName"></h3>
            <p class="product-subtitle">{{ getProductSubtitle(product2.type) }}</p>
            <div class="questionnaire-count">
              <span class="count-label">Questionnaires</span>
              <div class="count-number">{{ formatCount(product2.count) }}</div>
            </div>
          </div>

          <div class="sidebar-divider"></div>

          <div class="sidebar-actions">
            <button class="btn-sidebar btn-pdf" @click="sendPDF">
              Send this PDF report
            </button>
            <button class="btn-sidebar btn-exit" @click="exitSummary">
              Exit this summary
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Loading State -->
        <div v-if="resultsStore.isLoading" class="loading-state">
          <p>Loading results...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="resultsStore.error" class="error-state">
          <p>Failed to load results: {{ resultsStore.error.message }}</p>
          <button @click="retryFetch" class="btn-retry">Retry</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!resultsStore.hasData" class="empty-state">
          <p>No questionnaire data available yet.</p>
          <p>Complete some questionnaires to see results.</p>
        </div>

        <!-- Chart Content -->
        <div v-else-if="currentSection" class="results-content">
          <!-- Section Title -->
          <div v-if="currentSection.title" class="section-header">
            <h2 class="section-main-title">{{ currentSection.title }}</h2>
          </div>

          <!-- Bar Chart -->
          <ResultsChart
            v-if="currentSection.chartType === 'bar'"
            :title="currentSection.title"
            :subtitle="currentSection.subtitle"
            :product1-data="product1"
            :product2-data="product2"
            :question-ids="currentSection.questionIds"
            :task-labels="currentSection.taskLabels"
          />

          <!-- Pie Charts -->
          <ResultsPieChart
            v-else-if="currentSection.chartType === 'pie'"
            :product1-data="product1"
            :product2-data="product2"
            :question-configs="currentSection.questions"
          />

          <!-- Combined Table + Meter -->
          <ResultsVisualAcuitySatisfaction
            v-else-if="currentSection.chartType === 'combined'"
            :product1-data="product1"
            :product2-data="product2"
            :acuity-question-ids="currentSection.acuityQuestionIds"
            :acuity-measurement-labels="currentSection.acuityMeasurementLabels"
            :satisfaction-question-id="currentSection.satisfactionQuestionId"
          />

          <!-- Visual Acuity Table Only -->
          <ResultsTable
            v-else-if="currentSection.chartType === 'table'"
            :product1-data="product1"
            :product2-data="product2"
            :question-ids="currentSection.acuityQuestionIds"
            :measurement-labels="currentSection.acuityMeasurementLabels"
          />

          <!-- Satisfaction Meter Only -->
          <ResultsSatisfactionMeter
            v-else-if="currentSection.chartType === 'satisfaction'"
            :product1-data="product1"
            :product2-data="product2"
            :question-id="currentSection.satisfactionQuestionId"
          />
        </div>

        <!-- Tab Navigation -->
        <div v-if="!resultsStore.isLoading && resultsStore.hasData" class="tab-navigation">
          <button
            v-for="(section, index) in tabSections"
            :key="section.id"
            :class="['tab-button', { active: currentTab === index }]"
            @click="switchTab(index)"
          >
            {{ section.label }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { usePageStore } from '@/stores/page';
import { useResultsStore } from '@/stores/results';
import ResultsChart from './Subcomp/ResultsChart.vue';
import ResultsPieChart from './Subcomp/ResultsPieChart.vue';
import ResultsTable from './Subcomp/ResultsTable.vue';
import ResultsSatisfactionMeter from './Subcomp/ResultsSatisfactionMeter.vue';
import ResultsVisualAcuitySatisfaction from './Subcomp/ResultsVisualAcuitySatisfaction.vue';
import { RESULTS_TAB_SECTIONS } from '@/stores/resultsConfig';
import { QUESTIONNAIRE_CONFIGS } from '@/stores/questionnaireConfigs';

export default {
  name: 'Page2',
  components: {
    ResultsChart,
    ResultsPieChart,
    ResultsTable,
    ResultsSatisfactionMeter,
    ResultsVisualAcuitySatisfaction
  },
  setup() {
    const pageStore = usePageStore();
    const resultsStore = useResultsStore();
    return { pageStore, resultsStore };
  },
  data() {
    return {
      currentTab: 0
    };
  },
  computed: {
    comparisonSet() {
      return this.pageStore.comparisonSet;
    },
    tabSections() {
      return RESULTS_TAB_SECTIONS[this.comparisonSet] || [];
    },
    currentSection() {
      return this.tabSections[this.currentTab];
    },
    product1() {
      return this.resultsStore.product1Data;
    },
    product2() {
      return this.resultsStore.product2Data;
    }
  },
  async mounted() {
    if (this.comparisonSet) {
      await this.resultsStore.fetchResults(this.comparisonSet);
    } else {
      console.error('No comparison set provided');
    }
  },
  methods: {
    switchTab(tabIndex) {
      this.currentTab = tabIndex;
    },
    exitSummary() {
      this.resultsStore.clearResults();
      this.$emit('page-select', { pg: 0, tab: 0 });
    },
    sendPDF() {
      console.log('Sending PDF report');
      // Future implementation
    },
    async retryFetch() {
      if (this.comparisonSet) {
        await this.resultsStore.fetchResults(this.comparisonSet);
      }
    },
    formatCount(count) {
      if (count === 0) return '00';
      if (count < 10) return '0' + count;
      return String(count);
    },
    getProductSubtitle(type) {
      const config = QUESTIONNAIRE_CONFIGS[type];
      return config?.productInfo?.subtitle || '';
    }
  }
};
</script>

<style lang="scss" scoped>
.page2-wrapper {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  height: calc(100svh - 161px);

  @media only screen and (max-width: 1180px) {
    height: calc(100svh - 131px);
  }
}

.page2-container {
  display: flex;
  padding-bottom: 20px;
  /* height: 100%; */
}

/* Sidebar */
.sidebar {
  width: 211px;
  background: #003595;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px 24px;
  flex-shrink: 0;

  .sidebar-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sidebar-header {
    margin-bottom: 32px;

    .sidebar-title {
      font-size: 32px;
      line-height: 1.2em;
      font-weight: 700;
      color: white;
      margin: 0;
    }
  }

  .product-info {
    .product-name {
      font-size: 25px;
      line-height: 1.36em;
      font-weight: 300;
      color: white;
      margin: 0 0 5px;

      ::v-deep sup {
        font-size: 14px;
        position: relative;
        top: 2px;
      }
    }

    .product-subtitle {
      font-size: 14px;
      line-height: 1.36em;
      font-weight: 300;
      color: white;
      margin: 0 0 16px;
    }

    .questionnaire-count {
      .count-label {
        font-size: 14px;
        font-weight: 300;
        color: white;
        display: block;
        margin-bottom: 5px;
      }

      .count-number {
        font-size: 48px;
        line-height: 1em;
        font-weight: 300;
        color: white;
      }
    }
  }

  .sidebar-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
    margin: 20px 0;
  }

  .sidebar-actions {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .btn-sidebar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #FFF;
    border: 0 none;
    border-radius: 5px;
    padding: 12px 5px;
    font-size: 12px;
    line-height: 1em;
    letter-spacing: -0.015em;
    font-weight: 700;
    color: #0A0A0A;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 24px;

  @media only screen and (max-width: 1180px) {
    padding: 10px 0 0 24px;
  }

  .section-header {
    h2 {
      font-size: 40px;
      line-height: 1.26em;
      font-weight: 300;
      color: #003595;
      margin: 0 0 6px;

      @media only screen and (max-width: 1180px) {
        font-size: 32px;
      }

      @media only screen and (max-width: 1024px) {
        font-size: 30px;
      }
    }
  }
}

/* States */
.loading-state,
.error-state,
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    color: #1a1a1a;
    margin: 10px 0;
  }
}

.btn-retry {
  margin-top: 20px;
  padding: 10px 30px;
  background: #003595;
  color: white;
  border: none;
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 53, 149, 0.3);
  }
}

/* Tab Navigation */
.tab-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px 0 0;
}

.tab-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 13px 10px;
  font-size: 15px;
  line-height: 1.26em;
  font-weight: 700;
  color: #0A0A0A;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: #000;
    transform: translateY(-2px);
  }

  &.active {
    background: #000;
    color: white;
    border-color: #000;
  }
}
</style>
