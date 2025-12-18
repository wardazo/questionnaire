<template>
  <div class="page0-wrapper">
    <main class="main-area">

      <!-- ============================================ -->
      <!-- SELECTION VIEW -->
      <!-- ============================================ -->
      <div v-if="currentView === 'selection'" class="selection-view">
        <!-- Main Content: Title, Contact Info, and Dropdown -->
        <div class="selection-content">
          <h1 class="main-title">Patient Outcomes<br>PCIOLs</h1>
          <div class="contact-info">
            <p class="contact-name">{{ salesforceStore.salesforceAccountName }}</p>
<!--            <p class="contact-name">#{{ salesforceStore.salesforceContactName }}</p>-->
          </div>

          <CustomDropdown
            v-model="selectedPair"
            :options="dropdownOptions"
            placeholder="Please select one"
          />
        </div>

        <!-- Start Button (Absolutely Positioned) -->
        <button
          class="btn-start-selection"
          :disabled="!isStartEnabled"
          @click="goToProductView"
        >
          Start
        </button>

        <!-- Bottom Disclaimer -->
        <div class="disclaimer-selection">
          <p class="disclaimer-text">
            By accessing and using the tool, you acknowledge and agree that:<br>
            The results reflected by this tool are supported by a model that provides surgical practice reported data comparing range of vision and patient satisfaction data. Alcon makes no guarantees and results are as reported by the surgical practice. Model inputs consist of a number of patient specific variables in relation to questionnaire responses over time. Individual results may vary depending on a variety of patient attributes. It is always the practice's responsibility to determine medical necessity to use any of the products.<br>
            No personal health information, including patient names, dates or other information that directly or indirectly identifies any patient, should be entered into the tool or otherwise provided or made available to Alcon.<br>
            The practice is solely responsible for obtaining and maintaining any necessary patient consents or permissions to the extent required by applicable law.<br>
            The results of the questionnaires, including the responses provided by the patient, are communicated exclusively to the surgical practice. Under no circumstances may these results be shared among different surgeries or with third party.<br>
            © 2025 Alcon Inc. 10/25 IMG-CPO-2500047
          </p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- PRODUCT VIEW -->
      <!-- ============================================ -->
      <div v-else-if="currentView === 'product' && currentPairConfig" class="product-view">
        <!-- Header with Selected Pair Name -->
        <h1 style="margin-top: -25px" class="product-view-title" v-html="currentPairConfig.displayName"></h1>

        <!-- Blue Card with Two Products -->
        <div class="product-card-container">
          <div class="product-card-large">
            <!-- Product 1 Section -->
            <div class="product-section-large">
              <h2
                class="product-title-large"
                v-html="currentPairConfig.product1.name + '<br>' + currentPairConfig.product1.toricName"
              ></h2>
              <div class="count-subtitle-wrapper">
                <div class="product-count-large">
                  {{ formatCount(counts[currentPairConfig.product1.countKey]) }}
                </div>
                <p class="product-subtitle-large">
                  questionnaires<br>completed
                </p>
              </div>
              <button
                class="btn-start-new"
                @click="startQuestionnaireFromPair(currentPairConfig.product1)"
              >
                <strong>Start new</strong><br>
                <span>{{ currentPairConfig.product1.questionnaireLabel }}</span>
              </button>
            </div>

            <!-- Product 2 Section -->
            <div class="product-section-large">
              <h2
                class="product-title-large"
                v-html="currentPairConfig.product2.name + '<br>' + currentPairConfig.product2.toricName"
              ></h2>
              <div class="count-subtitle-wrapper">
                <div class="product-count-large">
                  {{ formatCount(counts[currentPairConfig.product2.countKey]) }}
                </div>
                <p class="product-subtitle-large">
                  questionnaires<br>completed
                </p>
              </div>
              <button
                class="btn-start-new"
                @click="startQuestionnaireFromPair(currentPairConfig.product2)"
              >
                <strong>Start new</strong><br>
                <span>{{ currentPairConfig.product2.questionnaireLabel }}</span>
              </button>
            </div>

            <!-- Results Button -->
            <button class="btn-results-large" @click="showResultsFromPair">
              Results
            </button>
          </div>
        </div>

        <!-- Footer: Home Button and Disclaimer -->
        <div class="product-view-footer">
          <button class="btn-home" @click="goToSelectionView">
            Home
          </button>

          <div class="disclaimer-product">
            <p class="disclaimer-text-small">
              *Trademarks are the property of their respective owners. Alcon medical device(s) comply with the current legislation for the medical devices.<br> Please refer to relevant product's instructions for use for complete list of indications, contraindications and warnings.
            </p>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import { useQuestionnaireStore } from '@/stores/questionnaire';
import { usePageStore } from '@/stores/page';
import { useSalesforceStore } from '@/stores/salesforce';
import { getQuestionnaireCounts } from '@/services/api';
import CustomDropdown from '@/components/Subcomp/CustomDropdown.vue';

// Product Pair Configuration
const PRODUCT_PAIRS = {
  'vivity-puresee': {
    displayName: 'Vivity<sup>®</sup> and PureSee<sup>*</sup>',
    comparisonSet: 'vivity-puresee',
    product1: {
      type: 'vivity',
      name: 'Vivity<sup>®</sup>',
      toricName: 'Vivity<sup>®</sup> Toric',
      countKey: 'vivity',
      questionnaireLabel: 'Vivity questionnaire'
    },
    product2: {
      type: 'puresee',
      name: 'PureSee<sup>*</sup>',
      toricName: 'PureSee<sup>*</sup> Toric',
      countKey: 'puresee',
      questionnaireLabel: 'PureSee questionnaire'
    }
  },
  'panoptix-odyssey': {
    displayName: 'PanOptix<sup>®</sup> and Odyssey*',
    comparisonSet: 'panoptix-odyssey',
    product1: {
      type: 'panoptix1',
      name: 'PanOptix<sup>®</sup>',
      toricName: 'PanOptix<sup>®</sup> Toric',
      countKey: 'panoptix1',
      questionnaireLabel: 'PanOptix questionnaire'
    },
    product2: {
      type: 'odyssey',
      name: 'Odyssey<sup>*</sup>',
      toricName: 'Odyssey* Toric',
      countKey: 'odyssey',
      questionnaireLabel: 'Odyssey questionnaire'
    }
  },
  'panoptix-galaxy': {
    displayName: 'PanOptix<sup>®</sup> and Galaxy*',
    comparisonSet: 'panoptix-galaxy',
    product1: {
      type: 'panoptix2',
      name: 'PanOptix<sup>®</sup>',
      toricName: 'PanOptix<sup>®</sup> Toric',
      countKey: 'panoptix2',
      questionnaireLabel: 'PanOptix questionnaire'
    },
    product2: {
      type: 'galaxy',
      name: 'Galaxy*',
      toricName: 'Galaxy<sup>*</sup> Toric',
      countKey: 'galaxy',
      questionnaireLabel: 'Galaxy questionnaire'
    }
  }
};

export default {
  name: "Page0",
  components: {
    CustomDropdown
  },
  data() {
    return {
      // Existing counts structure
      counts: {
        vivity: 0,
        puresee: 0,
        panoptix1: 0,
        odyssey: 0,
        panoptix2: 0,
        galaxy: 0
      }
    };
  },
  setup() {
    const questionnaireStore = useQuestionnaireStore();
    const pageStore = usePageStore();
    const salesforceStore = useSalesforceStore();
    return { questionnaireStore, pageStore, salesforceStore };
  },
  computed: {
    // Use page store for view state
    currentView: {
      get() {
        return this.pageStore.page0View;
      },
      set(value) {
        this.pageStore.setPage0View(value);
      }
    },

    // Use page store for selected pair
    selectedPair: {
      get() {
        return this.pageStore.page0SelectedPair;
      },
      set(value) {
        this.pageStore.setPage0SelectedPair(value);
      }
    },

    // Check if Start button should be enabled (selection view)
    isStartEnabled() {
      return this.selectedPair !== null;
    },

    // Get current pair configuration object
    currentPairConfig() {
      if (!this.selectedPair) return null;
      return PRODUCT_PAIRS[this.selectedPair];
    },

    // Get dropdown options as array
    dropdownOptions() {
      return [
        { value: 'vivity-puresee', label: 'Vivity<sup>®</sup> and PureSee<sup>*</sup>' },
        { value: 'panoptix-odyssey', label: 'PanOptix<sup>®</sup> and Odyssey<sup>*</sup>' },
        { value: 'panoptix-galaxy', label: 'PanOptix<sup>®</sup> and Galaxy<sup>*</sup>' }
      ];
    }
  },
  async mounted() {
    // Fetch counts when component is mounted
    await this.fetchCounts();
  },
  methods: {
    // ============================================
    // NEW METHODS
    // ============================================

    /**
     * Navigate from selection view to product view
     */
    goToProductView() {
      if (!this.selectedPair) {
        //console.warn('Cannot proceed without selection');
        return;
      }
      this.currentView = 'product';
      //console.log('Navigated to product view:', this.selectedPair);
    },

    /**
     * Navigate back to selection view (Home button)
     */
    goToSelectionView() {
      // Keep selection when returning to selection view
      this.currentView = 'selection';
      //console.log('Navigated back to selection view');
    },

    /**
     * Wrapper for startQuestionnaire to work with product pair structure
     * @param {Object} productConfig - Product configuration object
     */
    startQuestionnaireFromPair(productConfig) {
      const type = productConfig.type;
      this.startQuestionnaire(type);
    },

    /**
     * Wrapper for showResults to work with product pair structure
     */
    showResultsFromPair() {
      if (!this.currentPairConfig) return;
      const comparisonSet = this.currentPairConfig.comparisonSet;
      this.showResults(comparisonSet);
    },

    // ============================================
    // EXISTING METHODS (PRESERVED)
    // ============================================

    async fetchCounts() {
      try {
        // Get account ID from Salesforce store
        const accountId = this.salesforceStore.salesforceAccountId;

        if (!accountId) {
          //console.error('No account ID available');
          return;
        }

        //console.log('Fetching counts for account:', accountId);
        this.counts = await getQuestionnaireCounts(accountId);
      } catch (error) {
        //console.error('Failed to fetch questionnaire counts:', error);
      }
    },

    formatCount(count) {
      // Format count to always show 2 digits (00, 01, 02, ..., 99, 100+)
      if (count === 0) return '00';
      if (count < 10) return '0' + count;
      return String(count);
    },

    startQuestionnaire(type) {
      //console.log('Starting questionnaire:', type);
      // Initialize questionnaire in store
      this.questionnaireStore.startQuestionnaire(type);
      // Navigate to page 1
      this.$emit('page-select', { pg: 1, tab: 0 });
    },

    showResults(comparisonSet) {
      //console.log('Showing results for:', comparisonSet);
      // Store comparison set for Page2
      this.pageStore.setComparisonSet(comparisonSet);
      // Navigate to page 2
      this.$emit('page-select', { pg: 2, tab: 0 });
    }
  },
};
</script>

<style lang="scss" scoped>
// ===========================
// SHARED STYLES
// ===========================
.page0-wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: white;
}

.main-area {
  flex: 1;
  padding: 0px 60px;
  background: white;
  display: flex;
  flex-direction: column;
}

// ===========================
// SELECTION VIEW STYLES
// ===========================
.selection-view {
  position: relative;
  min-height: calc(100vh - 120px);
}

.selection-content {
  max-width: 80%;

  .main-title {
    font-family: 'Open Sans', sans-serif;
    font-size: 80px;
    font-weight: 300;
    color: #1a1a1a;
    line-height: 1.1;
    margin: 0 0 40px 0;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;

    .contact-name {
      font-family: 'Open Sans', sans-serif;
      font-size: 20px;
      font-weight: 500;
      color: #003595;
      margin: 0;
    }
  }

  .product-dropdown {
    width: 50%;
    max-width: 520px;
    height: 60px;
    padding: 0 20px;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: white;
    background: #696969;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 20px center;
    padding-right: 50px;

    &:focus {
      outline: 2px solid #003595;
      outline-offset: 2px;
    }

    option[disabled] {
      color: #999;
    }
  }
}

.btn-start-selection {
  position: absolute;
  bottom: 200px; // Above disclaimer (120px) + spacing (20px)
  right: 0;
  width: 200px;
  background: #003595;
  border: none;
  border-radius: 8px;
  font-family: 'Open Sans', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  padding: 20px 70px;

  &:disabled {
    background: #cce0ff;
    color: white;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: #002675;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 53, 149, 0.3);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }
}

.disclaimer-selection {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 0;

  .disclaimer-text {
    font-family: 'Open Sans', sans-serif;
    font-size: 9px;
    line-height: 1.4;
    color: #333;
    margin: 0;
  }
}

// ===========================
// PRODUCT VIEW STYLES
// ===========================
.product-view {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.product-view-title {
  font-family: 'Open Sans', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #003595;
  margin: 0 0 20px 0;
  text-align: left;
}

.product-card-container {
  width: 100%;
}

.product-card-large {
  background: #003595;
  border-radius: 13px;
  padding: 30px 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 30px 40px;

  .product-section-large {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .product-title-large {
      font-family: 'Open Sans', sans-serif;
      font-size: 32px;
      font-weight: 300;
      color: white;
      line-height: 1.3;
      margin: 0 0 0 0;
      min-height: 100px;
    }

    .count-subtitle-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;
      margin: 10px 0 10px 0;
    }

    .product-count-large {
      font-family: 'Open Sans', sans-serif;
      font-size: 72px;
      font-weight: 300;
      color: white;
      margin: 0;
    }

    .product-subtitle-large {
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      font-weight: 300;
      color: white;
      line-height: 1.4;
      margin: 0;
      text-align: left;
    }
  }

  .btn-start-new {
    width: 100%;
    background: white;
    border: none;
    border-radius: 8px;
    padding: 20px 25px;
    cursor: pointer;
    transition: all 0.2s;

    strong {
      font-family: 'Open Sans', sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #1a1a1a;
      display: block;
      line-height: 1.2;
    }

    span {
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #1a1a1a;
      display: block;
      margin-top: 5px;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .btn-results-large {
    grid-column: 1 / -1;
    width: 100%;
    background: #ffac1c;
    border: none;
    border-radius: 11px;
    padding: 25px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Open Sans', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: white;
    text-align: center;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(255, 172, 28, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.product-view-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  margin-top: 20px;

  .btn-home {
    flex: 0 0 auto;
    min-width: 150px;
    background: #003595;
    border: none;
    border-radius: 8px;
    padding: 8px 40px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 53, 149, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .disclaimer-product {
    flex: 1;

    .disclaimer-text-small {
      font-family: 'Open Sans', sans-serif;
      font-size: 9px;
      line-height: 1.4;
      color: #000;
      margin: 0;
      text-align: right;
    }
  }
}



</style>
