<template>
  <div class="page1-wrapper">
    <div class="page1-container" v-if="currentConfig">
      <!-- Left Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <div class="product-info">
            <h2 class="product-name" v-html="productInfo.name"></h2>
            <p class="product-subtitle" v-html="productInfo.subtitle"></p>
          </div>

          <div class="questionnaire-info">
            <p class="questionnaire-label">Questionnaires</p>
            <div class="questionnaire-count">05</div>
          </div>

          <div class="part-info">
            <p class="part-label">Part</p>
            <div class="part-number">{{ currentPart + 1 }}/{{ totalParts }}</div>
          </div>
        </div>

        <button class="btn-cancel" @click="cancelQuestionnaire">Cancel this questionnaire</button>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Dynamically render components based on current part config -->
        <component
          :is="currentPartConfig.component"
          v-bind="currentPartConfig"
          v-model="answers[`part${currentPart + 1}`]"
          @update:modelValue="updateAnswers"
        />

        <!-- Error Message -->
        <div v-if="submissionError" class="error-banner">
          <div class="error-content">
            <span class="error-icon">⚠️</span>
            <div class="error-text">
              <p class="error-title">Submission Failed</p>
              <p class="error-message">{{ submissionError }}</p>
            </div>
            <div class="error-actions">
              <button class="btn-retry" @click="retrySubmission" :disabled="isSubmitting">
                {{ isSubmitting ? 'Submitting...' : 'Retry' }}
              </button>
              <button class="btn-cancel-error" @click="cancelQuestionnaire">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Navigation -->
        <div class="bottom-nav">
          <button
            v-if="!isFirstPart"
            class="btn-back"
            @click="previousPart"
          >
            &lt;&lt; Back
          </button>
          <div v-else class="nav-spacer"></div>

          <div class="pagination-dots">
            <span
              v-for="index in totalParts"
              :key="index"
              :class="['dot', { active: currentPart === index - 1 }]"
            ></span>
          </div>

          <button
            v-if="!isLastPart"
            class="btn-next"
            @click="nextPart"
            :disabled="!isCurrentPartComplete"
          >
            Next &gt;&gt;
          </button>
          <button
            v-else
            class="btn-finish"
            @click="finishQuestionnaire"
            :disabled="isSubmitting || !isCurrentPartComplete"
          >
            {{ isSubmitting ? 'Submitting...' : 'Finish' }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useQuestionnaireStore } from '@/stores/questionnaire';
import { computed } from 'vue';
import QuestionRadio from './Subcomp/QuestionRadio.vue';
import QuestionScale from './Subcomp/QuestionScale.vue';
import QuestionVisualAcuity from './Subcomp/QuestionVisualAcuity.vue';

export default {
  name: "Page1",
  components: {
    QuestionRadio,
    QuestionScale,
    QuestionVisualAcuity
  },
  props: {
    page: {
      type: Object,
      default: () => ({ pg: 1, tab: 0 })
    }
  },
  data() {
    return {
      isSubmitting: false,
      submissionError: null
    };
  },
  setup() {
    const questionnaireStore = useQuestionnaireStore();

    const currentConfig = computed(() => questionnaireStore.currentConfig);
    const productInfo = computed(() => questionnaireStore.productInfo);
    const currentPart = computed(() => questionnaireStore.currentPart);
    const totalParts = computed(() => questionnaireStore.totalParts);
    const answers = computed(() => questionnaireStore.answers);
    const isFirstPart = computed(() => questionnaireStore.isFirstPart);
    const isLastPart = computed(() => questionnaireStore.isLastPart);

    // Get the configuration for the current part
    const currentPartConfig = computed(() => {
      if (!currentConfig.value) return null;
      const partKey = `part${currentPart.value + 1}`;
      return currentConfig.value.parts[partKey] || null;
    });

    return {
      questionnaireStore,
      currentConfig,
      productInfo,
      currentPart,
      totalParts,
      answers,
      isFirstPart,
      isLastPart,
      currentPartConfig
    };
  },
  computed: {
    // Check if all questions in the current part are answered
    isCurrentPartComplete() {
      if (!this.currentPartConfig) return false;

      const currentAnswers = this.answers[`part${this.currentPart + 1}`] || {};

      // Check based on component type
      if (this.currentPartConfig.component === 'QuestionRadio') {
        if (this.currentPartConfig.tasks) {
          // Tasks-based radio questions (e.g., Part 1)
          return this.currentPartConfig.tasks.every(task =>
            currentAnswers[task.key] !== undefined &&
            currentAnswers[task.key] !== null &&
            currentAnswers[task.key] !== ''
          );
        } else if (this.currentPartConfig.questions) {
          // Standard radio questions (e.g., Part 2)
          return this.currentPartConfig.questions.every(question =>
            currentAnswers[question.key] !== undefined &&
            currentAnswers[question.key] !== null &&
            currentAnswers[question.key] !== ''
          );
        }
      } else if (this.currentPartConfig.component === 'QuestionScale') {
        // Scale questions (e.g., Part 3) - note: 0 is a valid answer
        return this.currentPartConfig.questions.every(question =>
          currentAnswers[question.key] !== undefined &&
          currentAnswers[question.key] !== null &&
          currentAnswers[question.key] !== ''
        );
      } else if (this.currentPartConfig.component === 'QuestionVisualAcuity') {
        // Visual acuity measurements (e.g., Part 4)
        return this.currentPartConfig.measurements.every(measurement =>
          currentAnswers[measurement.key] !== undefined &&
          currentAnswers[measurement.key] !== null &&
          currentAnswers[measurement.key] !== ''
        );
      }

      return false;
    }
  },
  methods: {
    updateAnswers(newAnswers) {
      const partNumber = this.currentPart + 1;
      this.questionnaireStore.updatePartAnswers(partNumber, newAnswers);
    },
    nextPart() {
      this.questionnaireStore.nextPart();
    },
    previousPart() {
      this.questionnaireStore.previousPart();
    },
    async finishQuestionnaire() {
      // Prevent double submission
      if (this.isSubmitting) return;

      this.isSubmitting = true;
      this.submissionError = null;

      try {
        const result = await this.questionnaireStore.completeQuestionnaire();

        if (result.success) {
          //console.log('Questionnaire completed successfully:', result.data);
          // Navigate back to home
          this.$emit('page-select', { pg: 0, tab: 0 });
        } else {
          // Handle error
          this.submissionError = this.getErrorMessage(result.error);
        }
      } catch (error) {
        // Unexpected error
        this.submissionError = 'An unexpected error occurred. Please try again.';
        //console.error('Unexpected error:', error);
      } finally {
        this.isSubmitting = false;
      }
    },
    getErrorMessage(error) {
      if (!error) return 'An error occurred. Please try again.';

      switch (error.type) {
        case 'network_error':
          return 'Network error. Please check your connection and try again.';
        case 'api_error':
          if (error.status === 400) {
            return `Validation error: ${error.message}`;
          } else if (error.status >= 500) {
            return 'Server error. Please try again later.';
          }
          return error.message || 'Server error. Please try again.';
        default:
          return error.message || 'An error occurred. Please try again.';
      }
    },
    retrySubmission() {
      this.submissionError = null;
      this.finishQuestionnaire();
    },
    cancelQuestionnaire() {
      this.questionnaireStore.cancelQuestionnaire();
      // Navigate back to home
      this.$emit('page-select', { pg: 0, tab: 0 });
    }
  },
};
</script>

<style lang="scss" scoped>
.page1-wrapper {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  height: calc(100svh - 161px);

  @media only screen and (max-width: 1180px) {
    height: calc(100svh - 131px);
  }
}

.page1-container {
  display: flex;
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
  }

  .product-info {
    .product-name {
      font-size: 20px;
      line-height: 1.14em;
      font-weight: 700;
      color: white;
      margin: 0 0 29px;

      ::v-deep sup {
        font-size: 12px;
        position: relative;
        top: 2px;
      }
    }

    .product-subtitle {
      font-size: 25px;
      line-height: 1.36em;
      font-weight: 300;
      color: white;
      margin: 0 0 44px;

      ::v-deep sup {
        font-size: 14px;
        position: relative;
        top: 2px;
      }
    }
  }

  .questionnaire-info,
  .part-info {
    .questionnaire-label,
    .part-label {
      font-size: 14px;
      line-height: 1.26em;
      font-weight: 300;
      color: white;
      margin: 0 0 10px;
    }

    .questionnaire-count,
    .part-number {
      font-size: 48px;
      line-height: 1em;
      font-weight: 300;
      color: white;
      margin: 0 0 18px;
      border-bottom: 1px solid #FFF;
      padding-bottom: 36px;
    }
  }

  .btn-cancel {
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
}

/* Bottom Navigation */
.bottom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;

  .nav-spacer {
    width: 150px;
  }

  .pagination-dots {
    display: flex;
    gap: 40px;
    align-items: center;

    .dot {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #F2F2F2;
      transition: all 0.2s;

      &.active {
        background: #003595;
        width: 19px;
        height: 19px;
      }
    }
  }

  .btn-back,
  .btn-next,
  .btn-finish {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 196px;
    background: #003595;
    border: 0 none;
    border-radius: 5px;
    padding: 13px 12px;
    font-size: 12px;
    line-height: 1em;
    font-weight: 700;
    color: white;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 53, 149, 0.3);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
}

/* Error Banner */
.error-banner {
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.error-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.error-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.error-text {
  flex: 1;

  .error-title {
    font-weight: 600;
    color: #856404;
    margin: 0 0 4px 0;
    font-size: 14px;
  }

  .error-message {
    color: #856404;
    margin: 0;
    font-size: 13px;
  }
}

.error-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.btn-retry,
.btn-cancel-error {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-retry {
  background: #003595;
  color: white;

  &:not(:disabled):hover {
    background: #002b75;
    transform: translateY(-1px);
  }
}

.btn-cancel-error {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;

  &:hover {
    background: #e9ecef;
  }
}
</style>
