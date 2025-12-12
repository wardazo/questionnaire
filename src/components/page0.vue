<template>
  <div class="page0-wrapper">
    <!-- Main Content -->
    <main class="main-area">
      <div class="products-grid">
        <!-- Left Sidebar Column -->
        <div class="sidebar-column">
          <div class="sidebar-content">
            <div class="page-title">
              <h1>Patient<br>Outcomes<br>PCIOLs</h1>
            </div>

            <div class="nav-links">
              <a href="#" class="nav-link">{{ salesforceStore.salesforceAccountName }}</a>
              <a href="#" class="nav-link">{{ salesforceStore.salesforceContactName }}</a>
            </div>
          </div>
        </div>
        <!-- Column 1: Vivity + PureSee -->
        <div class="product-column">
          <div class="product-card-dual">
            <div class="product-section">
              <h2 class="product-title">Vivity®<br>Vivity® Toric</h2>
              <div class="product-count">{{ formatCount(counts.vivity) }}</div>
              <p class="product-subtitle">questionnaires<br>completed</p>
              <button class="btn-start" @click="startQuestionnaire('vivity')">
                <strong>Start new</strong><br>
                <span>Vivity questionnaire</span>
              </button>
            </div>

            <div class="product-section">
              <h2 class="product-title">PureSee*<br>PureSee* Toric</h2>
              <div class="product-count">{{ formatCount(counts.puresee) }}</div>
              <p class="product-subtitle">questionnaires<br>completed</p>
              <button class="btn-start" @click="startQuestionnaire('puresee')">
                <strong>Start new</strong><br>
                <span>PureSee questionnaire</span>
              </button>
            </div>
          </div>

          <button class="btn-results" @click="showResults('vivity-puresee')">
            <strong>Results</strong><br>
            <span>Vivity® and PureSee*</span>
          </button>
        </div>

        <!-- Column 2: PanOptix + Odyssey -->
        <div class="product-column">
          <div class="product-card-dual">
            <div class="product-section">
              <h2 class="product-title">PanOptix®<br>PanOptix® Toric</h2>
              <div class="product-count">{{ formatCount(counts.panoptix1) }}</div>
              <p class="product-subtitle">questionnaires<br>completed</p>
              <button class="btn-start" @click="startQuestionnaire('panoptix1')">
                <strong>Start new</strong><br>
                <span>PanOptix questionnaire</span>
              </button>
            </div>

            <div class="product-section">
              <h2 class="product-title">Odyssey*<br>Odyssey* Toric</h2>
              <div class="product-count">{{ formatCount(counts.odyssey) }}</div>
              <p class="product-subtitle">questionnaires<br>completed</p>
              <button class="btn-start" @click="startQuestionnaire('odyssey')">
                <strong>Start new</strong><br>
                <span>Odyssey questionnaire</span>
              </button>
            </div>
          </div>

          <button class="btn-results" @click="showResults('panoptix-odyssey')">
            <strong>Results</strong><br>
            <span>PanOptix® and Odyssey*</span>
          </button>
        </div>

        <!-- Column 3: PanOptix + Galaxy -->
        <div class="product-column">
          <div class="product-card-dual">
            <div class="product-section">
              <h2 class="product-title">PanOptix®<br>PanOptix® Toric</h2>
              <div class="product-count">{{ formatCount(counts.panoptix2) }}</div>
              <p class="product-subtitle">questionnaires<br>completed</p>
              <button class="btn-start" @click="startQuestionnaire('panoptix2')">
                <strong>Start new</strong><br>
                <span>PanOptix questionnaire</span>
              </button>
            </div>

            <div class="product-section">
              <h2 class="product-title">Galaxy*<br>Galaxy* Toric</h2>
              <div class="product-count">{{ formatCount(counts.galaxy) }}</div>
              <p class="product-subtitle">questionnaires<br>completed</p>
              <button class="btn-start" @click="startQuestionnaire('galaxy')">
                <strong>Start new</strong><br>
                <span>Galaxy questionnaire</span>
              </button>
            </div>
          </div>

          <button class="btn-results" @click="showResults('panoptix-galaxy')">
            <strong>Results</strong><br>
            <span>PanOptix® and Galaxy*</span>
          </button>
        </div>
      </div>

      <!-- Bottom Section: Legal Text and Send Summary Button -->
      <div class="bottom-section">
        <div class="bottom-content">
          <div class="legal-footer">
            <p class="legal-small">
              By accessing and using the tool, the practice acknowledges and agrees that no personal health information, including patient names, dates or other information that directly or indirectly identifies any patient, should be entered into the tool or otherwise provided or made available to Alcon. The practice is solely responsible for obtaining and maintaining any necessary patient consents or permissions to the extent required by applicable law.
            </p>
            <p class="legal-small">
              Alcon document for Healthcare Professional use. No personal information will be shared with Alcon.<br>
              *Trademarks are the property of their respective owners. Alcon medical device(s) comply with the current legislation for the medical devices. Please refer to relevant product's instructions for use for complete list of indications, contraindications and warnings.<br>
              © 2025 Alcon Inc. 10/25 IMG-CPO-2500047
            </p>
          </div>

          <button class="btn-send-summary" @click="sendSummary">
            <strong>Send Summary</strong><br>
            <span>PDF</span>
          </button>
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

export default {
  name: "Page0",
  data() {
    return {
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
  async mounted() {
    // Fetch counts when component is mounted
    await this.fetchCounts();
  },
  methods: {
    async fetchCounts() {
      try {
        // Get contact ID from Salesforce store
        const contactId = this.salesforceStore.salesforceContactId;

        if (!contactId) {
          console.error('No contact ID available');
          return;
        }

        console.log('Fetching counts for contact:', contactId);
        this.counts = await getQuestionnaireCounts(contactId);
      } catch (error) {
        console.error('Failed to fetch questionnaire counts:', error);
      }
    },
    formatCount(count) {
      // Format count to always show 2 digits (00, 01, 02, ..., 99, 100+)
      if (count === 0) return '00';
      if (count < 10) return '0' + count;
      return String(count);
    },
    startQuestionnaire(type) {
      console.log('Starting questionnaire:', type);
      // Initialize questionnaire in store
      this.questionnaireStore.startQuestionnaire(type);
      // Navigate to page 1
      this.$emit('page-select', { pg: 1, tab: 0 });
    },
    showResults(comparisonSet) {
      console.log('Showing results for:', comparisonSet);
      // Store comparison set for Page2
      this.pageStore.setComparisonSet(comparisonSet);
      // Navigate to page 2
      this.$emit('page-select', { pg: 2, tab: 0 });
    },
    sendSummary() {
      console.log('Sending summary');
    }
  },
};
</script>

<style lang="scss" scoped>
.page0-wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: white;
}

/* Main Content Area */
.main-area {
  flex: 1;
  padding: 20px 40px 0;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
}

/* Sidebar Column */
.sidebar-column {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 0;

  .sidebar-content {
    flex: 1;
  }

  .page-title {
    margin-bottom: 60px;

    h1 {
      font-family: 'Open Sans', sans-serif;
      font-size: 48px;
      font-weight: 300;
      color: #1a1a1a;
      line-height: 1.1;
      margin: 0;
    }
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .nav-link {
      font-family: 'Open Sans', sans-serif;
      font-size: 20px;
      font-weight: 500;
      color: #003595;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.product-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Bottom Section */
.bottom-section {
  width: 100%;
  margin-top: 0;
}

.bottom-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  align-items: flex-end;
}

/* Legal Footer */
.legal-footer {
  grid-column: 1 / 4;
  padding-right: 100px;

  .legal-small {
    font-family: 'Open Sans', sans-serif;
    font-size: 9px;
    line-height: 1.4;
    color: #000;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* Product Cards */
.product-card-dual {
  background: #003595;
  border-radius: 13px;
  padding: 35px 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
}

.product-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .product-title {
    font-family: 'Open Sans', sans-serif;
    font-size: 25px;
    font-weight: 300;
    color: white;
    line-height: 1.3;
    margin: 0 0 15px 0;
  }

  .product-count {
    font-family: 'Open Sans', sans-serif;
    font-size: 48px;
    font-weight: 300;
    color: white;
    margin: 5px 0;
  }

  .product-subtitle {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: white;
    line-height: 1.3;
    margin: 0 0 20px 0;
  }
}

/* Buttons */
.btn-start {
  width: 100%;
  background: white;
  border: none;
  border-radius: 5px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.2s;

  strong {
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    display: block;
    line-height: 1.2;
  }

  span {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: #1a1a1a;
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

.btn-results {
  width: 100%;
  background: #ffac1c;
  border: none;
  border-radius: 11px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  strong {
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: white;
    display: block;
    line-height: 1.2;
  }

  span {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: white;
    display: block;
    margin-top: 3px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
}

.btn-send-summary {
  grid-column: 4 / 5;
  width: 100%;
  background: #ffac1c;
  border: none;
  border-radius: 11px;
  padding: 25px 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  strong {
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: white;
    display: block;
    line-height: 1.2;
    white-space: nowrap;
  }

  span {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: white;
    display: block;
    margin-top: 5px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
