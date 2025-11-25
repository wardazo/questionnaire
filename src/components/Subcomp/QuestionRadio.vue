<template>
  <div class="question-section">
    <h1 class="section-title">{{ title }}</h1>

    <!-- Optional main question text (for task mode) -->
    <p v-if="questionText" class="question-text">{{ questionText }}</p>

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
      <p class="question-text-item">{{ question.text }}</p>
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
    font-family: 'Open Sans', sans-serif;
    font-size: 36px;
    font-weight: 300;
    color: #003595;
    margin: 0 0 20px 0;
  }

  .question-text {
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 50px 0;
  }
}

// Task mode styling (with bullets)
.task-group {
  background: #E8E8E8;
  border-radius: 8px;
  padding: 30px 40px;
  margin-bottom: 30px;

  .task-header {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;

    .bullet {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.2;
    }

    .task-text {
      flex: 1;
      font-family: 'Open Sans', sans-serif;
      font-size: 18px;
      color: #1a1a1a;
      line-height: 1.4;

      strong {
        font-weight: 700;
        display: block;
        margin-bottom: 5px;
      }

      .task-examples {
        font-weight: 400;
        display: block;
      }
    }
  }

  .radio-group {
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    padding-left: 39px;
    flex-wrap: wrap;
  }
}

// Questions mode styling (no bullets)
.question-group {
  background: #E8E8E8;
  border-radius: 8px;
  padding: 30px 40px;
  margin-bottom: 30px;

  .question-text-item {
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 25px 0;
    line-height: 1.4;
  }

  .radio-group {
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

// Shared radio option styling
.radio-option {
  background: white;
  border: 2px solid #D0D0D0;
  border-radius: 50px;
  padding: 12px 30px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0;
  position: relative;

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
