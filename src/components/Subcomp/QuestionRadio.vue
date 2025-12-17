<template>
  <div class="question-section">
    <div class="question-section-intro">
      <h1 class="section-title">{{ title }}</h1>

      <!-- Optional main question text (for task mode) -->
      <p v-if="questionText" class="question-text">{{ questionText }}</p>
    </div>

    <!-- Render tasks (with bullets and shared options) -->
    <template v-if="tasks && tasks.length">
      <div
        v-for="task in tasks"
        :key="task.key"
        class="task-group"
      >
      <div class="task-header">
        <span class="bullet">•</span>
        <div class="task-text">
          <strong>{{ task.label }}</strong>
          <span v-if="task.description" class="task-examples">{{ task.description }}</span>
        </div>
      </div>
      <div class="radio-group">
        <label
          v-for="option in options"
          :key="option.value"
          class="radio-option"
        >
          <input
            type="radio"
            :name="`task-${task.key}`"
            :value="option.value"
            v-model="answers[task.key]"
            @change="emitChange"
          >
          <span>{{ option.label }}</span>
        </label>
      </div>
      </div>
    </template>

    <!-- Render questions (no bullets, each with own options) -->
    <template v-if="questions && questions.length">
      <div
        v-for="question in questions"
        :key="question.key"
        class="question-group"
      >
      <div class="task-header">
        <span class="bullet">•</span>
        <div class="task-text">
          {{ question.text }}
        </div>
      </div>
      <div class="radio-group">
        <label
          v-for="option in question.options"
          :key="option.value"
          class="radio-option"
        >
          <input
            type="radio"
            :name="question.key"
            :value="option.value"
            v-model="answers[question.key]"
            @change="emitChange"
          >
          <span>{{ option.label }}</span>
        </label>
      </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "QuestionRadio",
  props: {
    title: {
      type: String,
      required: true
    },
    // For task mode (e.g., Spectacle Independence)
    questionText: {
      type: String,
      default: ''
    },
    tasks: {
      type: Array,
      default: () => []
      // Example: [{ key: 'farAway', label: 'Far away', description: '(e.g., watching TV...)' }]
    },
    options: {
      type: Array,
      default: () => []
      // Shared options for all tasks (used only in task mode)
    },
    // For questions mode (e.g., Visual Disturbances)
    questions: {
      type: Array,
      default: () => []
      // Example: [{ key: 'halos', text: 'Do you experience halos?', options: [...] }]
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      answers: { ...this.modelValue }
    };
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.answers = { ...newVal };
      },
      deep: true
    }
  },
  methods: {
    emitChange() {
      this.$emit('update:modelValue', this.answers);
    }
  }
};
</script>

<style lang="scss" scoped>
.question-section {
  flex: 1;

  .section-title {
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

  .question-text {
    max-width: 640px;
    width: 100%;
    font-size: 30px;
    line-height: 1.24em;
    font-weight: 700;
    color: #000000;
    margin: 0 0 24px;

    @media only screen and (max-width: 1180px) {
      font-size: 24px;
    }

    @media only screen and (max-width: 1024px) {
      font-size: 20px;
    }
  }
}

.task-header {
  display: flex;
  gap: 13px;
  margin-bottom: 14px;

  @media only screen and (max-width: 1024px) {
    margin-bottom: 8px;
  }

  .bullet {
    font-size: 20px;
    line-height: 1.36em;
    font-weight: 700;
    color: #000;

    @media only screen and (max-width: 1180px) {
      font-size: 18px;
    }
  }

  .task-text {
    display: flex;
    font-size: 20px;
    line-height: 1.36em;
    font-weight: 700;
    color: #000;

    @media only screen and (max-width: 1180px) {
      font-size: 18px;
    }

    strong {
      font-weight: 700;
      margin-right: 6px;
    }

    span {
      font-weight: 400;
    }
  }
}

// Task mode styling (with bullets)
.task-group {
  background: #F2F2F2;
  border-radius: 13px;
  padding: 18px 5px 18px 15px;
  margin-bottom: 14px;





  .radio-group {
    display: flex;
    gap: 30px;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-left: 21px;

    @media only screen and (max-width: 1180px) {
      gap: 20px;
    }
  }
}

// Questions mode styling (no bullets)
.question-group {
  background: #F2F2F2;
  border-radius: 13px;
  padding: 20px 24px;
  margin-bottom: 14px;

  @media only screen and (max-width: 1180px) {
    padding: 16px 24px;
    margin-bottom: 16px;
  }

  .radio-group {
    display: flex;
    gap: 30px;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-left: 21px;

    @media only screen and (max-width: 1180px) {
      gap: 20px;
    }
  }
}

// Shared radio option styling
.radio-option {
  background: white;
  border: 1px solid #A8A8A8;
  border-radius: 8px;
  padding: 11px 42px;
  font-size: 18px;
  line-height: 1em;
  letter-spacing: -0.015em;
  font-weight: 400;
  color: #242424;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0;
  position: relative;

  @media only screen and (max-width: 1180px) {
    padding: 8px 36px;
    font-size: 16px;
  }

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    user-select: none;
  }

  &:hover {
    border-color: #003595;
  }

  input[type="radio"]:checked + span {
    font-weight: 700;
  }

  &:has(input[type="radio"]:checked) {
    background: #003595;
    border-color: #003595;
    color: white;
  }
}
</style>
