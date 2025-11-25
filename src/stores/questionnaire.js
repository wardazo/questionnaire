import { defineStore } from 'pinia';
import { QUESTIONNAIRE_CONFIGS } from './questionnaireConfigs';

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
        console.error(`Invalid questionnaire type: ${type}`);
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

    // Complete questionnaire (prepare for API submission)
    async completeQuestionnaire() {
      const payload = this.apiPayload;

      // TODO: API integration point
      // try {
      //   await api.submitQuestionnaire(payload);
      // } catch (error) {
      //   throw error;
      // }

      console.log('Questionnaire completed:', payload);

      // Reset after successful submission
      this.cancelQuestionnaire();

      return payload;
    }
  }
});
