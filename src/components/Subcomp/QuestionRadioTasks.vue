<template>
  <div class="question-section">
    <h1 class="section-title">{{ title }}</h1>
    <p class="question-text">{{ questionText }}</p>

    <div
      v-for="(task, index) in tasks"
      :key="index"
      class="task-group"
    >
      <div class="task-header">
        <span class="bullet">•</span>
        <div class="task-text">
          <strong>{{ task.label }}</strong>
          <span class="task-examples">{{ task.description }}</span>
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
            :name="`task-${index}`"
            :value="option.value"
            v-model="answers[task.key]"
            @change="emitChange"
          >
          <span>{{ option.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionRadioTasks",
  props: {
    title: {
      type: String,
      required: true
    },
    questionText: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      required: true,
      // Example: [{ key: 'farAway', label: 'Far away', description: '(e.g., watching TV...)' }]
    },
    options: {
      type: Array,
      default: () => [
        { label: 'Never', value: 'never' },
        { label: 'Occasionally', value: 'occasionally' },
        { label: 'Often', value: 'often' },
        { label: 'Always', value: 'always' }
      ]
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
  }
}
</style>
