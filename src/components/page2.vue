<template>
  <div class="page2-wrapper">
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

        <div class="sidebar-actions">
          <button class="btn-sidebar btn-pdf" @click="sendPDF">
            <strong>Send this</strong><br>
            <span>PDF report</span>
          </button>
          <button class="btn-sidebar btn-exit" @click="exitSummary">
            <strong>Exit this summary</strong>
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
</template>

<script>
import { usePageStore } from '@/stores/page';
import { useResultsStore } from '@/stores/results';
import ResultsChart from './Subcomp/ResultsChart.vue';
import ResultsPieChart from './Subcomp/ResultsPieChart.vue';
import { RESULTS_TAB_SECTIONS } from '@/stores/resultsConfig';
import { QUESTIONNAIRE_CONFIGS } from '@/stores/questionnaireConfigs';

export default {
  name: 'Page2',
  components: { ResultsChart, ResultsPieChart },
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
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: white;
}

/* Sidebar */
.sidebar {
  width: 230px;
  background: #003595;
  padding: 40px 30px;
  color: white;
  display: flex;
  flex-direction: column;

  .sidebar-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sidebar-header {
    margin-bottom: 40px;

    .sidebar-title {
      font-family: 'Open Sans', sans-serif;
      font-size: 32px;
      font-weight: 300;
      color: white;
      margin: 0;
    }
  }

  .product-info {
    margin-bottom: 30px;

    .product-name {
      font-family: 'Open Sans', sans-serif;
      font-size: 20px;
      font-weight: 300;
      color: white;
      line-height: 1.3;
      margin: 0 0 5px 0;
    }

    .product-subtitle {
      font-family: 'Open Sans', sans-serif;
      font-size: 12px;
      font-weight: 300;
      color: white;
      margin: 0 0 15px 0;
    }

    .questionnaire-count {
      .count-label {
        font-family: 'Open Sans', sans-serif;
        font-size: 12px;
        font-weight: 300;
        color: white;
        display: block;
        margin-bottom: 5px;
      }

      .count-number {
        font-family: 'Open Sans', sans-serif;
        font-size: 48px;
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
    gap: 15px;
  }

  .btn-sidebar {
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 15px 20px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;

    strong {
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      font-weight: 700;
      display: block;
      line-height: 1.2;
    }

    span {
      font-family: 'Open Sans', sans-serif;
      font-size: 12px;
      font-weight: 400;
      display: block;
      margin-top: 3px;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .btn-pdf {
    background: #ffac1c;
    color: white;
  }

  .btn-exit {
    background: white;
    color: #1a1a1a;

    strong {
      font-size: 14px;
    }
  }
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
}

.results-content {
  flex: 1;

  .section-header {
    margin-bottom: 30px;

    .section-main-title {
      font-family: 'Open Sans', sans-serif;
      font-size: 28px;
      font-weight: 600;
      color: #003595;
      margin: 0;
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
  gap: 15px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #D0D0D0;
}

.tab-button {
  background: white;
  border: 2px solid #D0D0D0;
  border-radius: 8px;
  padding: 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: #003595;
    transform: translateY(-2px);
  }

  &.active {
    background: #003595;
    color: white;
    border-color: #003595;
  }
}
</style>
