import { defineStore } from 'pinia';
import { QUESTIONNAIRE_CONFIGS } from './questionnaireConfigs';
import { submitQuestionnaire } from '@/services/api';
import { useSalesforceStore } from './salesforce';

export const useQuestionnaireStore = defineStore('questionnaire', {
  state: () => ({
    // Current questionnaire type: 'vivity' | 'puresee' | 'panoptix1' | 'odyssey' | 'panoptix2' | 'galaxy' | null
    currentType: null,

    // Current part index (0-based: 0-3 for 4-part, 0-4 for 5-part)
    currentPart: 0,

    // Answers organized by part (dynamically populated based on totalParts)
    answers: {},

    // Timestamp for when questionnaire started (for future API)
    startedAt: null,

    // Flag to track if questionnaire is in progress
    isActive: false
  }),

  getters: {
    // Get full config for current type
    currentConfig: (state) => {
      if (!state.currentType) return null;
      return QUESTIONNAIRE_CONFIGS[state.currentType];
    },

    // Get product display info for sidebar
    productInfo: (state) => {
      if (!state.currentType) return null;
      return QUESTIONNAIRE_CONFIGS[state.currentType]?.productInfo || null;
    },

    // Get config for part 1
    part1Config: (state) => {
      if (!state.currentType) return null;
      return QUESTIONNAIRE_CONFIGS[state.currentType]?.parts?.part1 || null;
    },

    // Get config for part 2
    part2Config: (state) => {
      if (!state.currentType) return null;
      return QUESTIONNAIRE_CONFIGS[state.currentType]?.parts?.part2 || null;
    },

    // Get config for part 3
    part3Config: (state) => {
      if (!state.currentType) return null;
      return QUESTIONNAIRE_CONFIGS[state.currentType]?.parts?.part3 || null;
    },

    // Get config for part 4
    part4Config: (state) => {
      if (!state.currentType) return null;
      return QUESTIONNAIRE_CONFIGS[state.currentType]?.parts?.part4 || null;
    },

    // Get config for part 5
    part5Config: (state) => {
      if (!state.currentType) return null;
      return QUESTIONNAIRE_CONFIGS[state.currentType]?.parts?.part5 || null;
    },

    // Total parts count from current config
    totalParts: (state) => {
      if (!state.currentType) return 0;
      return QUESTIONNAIRE_CONFIGS[state.currentType]?.totalParts || 0;
    },

    // Check if on first part
    isFirstPart: (state) => state.currentPart === 0,

    // Check if on last part
    isLastPart(state) {
      if (!state.currentType) return false;
      const total = QUESTIONNAIRE_CONFIGS[state.currentType]?.totalParts || 0;
      return state.currentPart === total - 1;
    },

    // Prepare payload for API submission
    apiPayload: (state) => ({
      questionnaireType: state.currentType,
      startedAt: state.startedAt,
      completedAt: new Date().toISOString(),
      answers: { ...state.answers }
    })
  },

  actions: {
    // Start a new questionnaire
    startQuestionnaire(type) {
      if (!QUESTIONNAIRE_CONFIGS[type]) {
        //console.error(`Invalid questionnaire type: ${type}`);
        return false;
      }

      this.currentType = type;
      this.currentPart = 0;

      // Initialize answers object based on totalParts
      const totalParts = QUESTIONNAIRE_CONFIGS[type].totalParts;
      this.answers = {};
      for (let i = 1; i <= totalParts; i++) {
        this.answers[`part${i}`] = {};
      }

      this.startedAt = new Date().toISOString();
      this.isActive = true;

      return true;
    },

    // Update answers for a specific part
    updatePartAnswers(partNumber, answers) {
      const partKey = `part${partNumber}`;
      if (this.answers[partKey] !== undefined) {
        this.answers[partKey] = { ...this.answers[partKey], ...answers };
      }
    },

    // Navigate to next part
    nextPart() {
      if (!this.currentType) return false;
      const totalParts = QUESTIONNAIRE_CONFIGS[this.currentType].totalParts;
      if (this.currentPart < totalParts - 1) {
        this.currentPart++;
        return true;
      }
      return false;
    },

    // Navigate to previous part
    previousPart() {
      if (this.currentPart > 0) {
        this.currentPart--;
        return true;
      }
      return false;
    },

    // Go to specific part
    goToPart(partIndex) {
      if (!this.currentType) return false;
      const totalParts = QUESTIONNAIRE_CONFIGS[this.currentType].totalParts;
      if (partIndex >= 0 && partIndex < totalParts) {
        this.currentPart = partIndex;
        return true;
      }
      return false;
    },

    // Cancel/reset questionnaire
    cancelQuestionnaire() {
      this.currentType = null;
      this.currentPart = 0;
      this.answers = {};
      this.startedAt = null;
      this.isActive = false;
    },

    // Complete questionnaire (submit to API)
    async completeQuestionnaire() {
      // Generate 6-digit random number
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;

      // Get config for current questionnaire type
      const config = QUESTIONNAIRE_CONFIGS[this.currentType];

      // Transform answers from part-based to flat array with question IDs
      const answersArray = [];

      Object.keys(this.answers).forEach(partKey => {
        const partNumber = parseInt(partKey.replace('part', ''));
        const partConfig = config.parts[`part${partNumber}`];
        const partAnswers = this.answers[partKey];

        // Extract question IDs based on component type
        if (partConfig.component === 'QuestionRadio' && partConfig.tasks) {
          // Handle tasks-based radio questions (Part 1)
          partConfig.tasks.forEach(task => {
            if (partAnswers[task.key] !== undefined) {
              answersArray.push({
                questionId: task.questionId,
                value: String(partAnswers[task.key])
              });
            }
          });
        } else if (partConfig.component === 'QuestionRadio' && partConfig.questions) {
          // Handle standard radio questions (Part 2, Part 3 in SET3)
          partConfig.questions.forEach(question => {
            if (partAnswers[question.key] !== undefined) {
              answersArray.push({
                questionId: question.questionId,
                value: String(partAnswers[question.key])
              });
            }
          });
        } else if (partConfig.component === 'QuestionScale' && partConfig.questions) {
          // Handle scale questions (Part 3 in SET1/SET2, Part 4 in SET2/SET3)
          partConfig.questions.forEach(question => {
            if (partAnswers[question.key] !== undefined) {
              answersArray.push({
                questionId: question.questionId,
                value: String(partAnswers[question.key])
              });
            }
          });
        } else if (partConfig.component === 'QuestionVisualAcuity' && partConfig.measurements) {
          // Handle visual acuity measurements (Part 4 in SET1, Part 5 in SET2/SET3)
          partConfig.measurements.forEach(measurement => {
            if (partAnswers[measurement.key] !== undefined) {
              answersArray.push({
                questionId: measurement.questionId,
                value: String(partAnswers[measurement.key])
              });
            }
          });
        }
      });

      // Get Salesforce account ID
      const salesforceStore = useSalesforceStore();
      const accountId = salesforceStore.salesforceAccountId;

      if (!accountId) {
        //console.error('Cannot submit questionnaire: No Salesforce account ID available');
        return {
          success: false,
          error: {
            type: 'validation_error',
            message: 'Salesforce account ID is required'
          }
        };
      }

      // Prepare payload
      const payload = {
        questionnaireType: this.currentType,
        salesforceAccountId: accountId,
        startedAt: this.startedAt,
        completedAt: new Date().toISOString(),
        randomNumber: randomNumber,
        answers: answersArray
      };

      try {
        // Submit to API
        const response = await submitQuestionnaire(payload);

        //console.log('Questionnaire submitted successfully:', response);

        // Reset store after successful submission
        this.cancelQuestionnaire();

        return {
          success: true,
          data: response
        };
      } catch (error) {
        //console.error('Failed to submit questionnaire:', error);

        // Don't reset store on error - keep data for retry
        return {
          success: false,
          error: error
        };
      }
    }
  }
});
