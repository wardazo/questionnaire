<template>
  <div class="question-section">
    <h1 class="section-title">{{ title }}</h1>

    <div
      v-for="(question, qIndex) in questions"
      :key="qIndex"
      class="scale-group"
    >
      <div class="scale-question">
        <span class="bullet">•</span>
        <span class="question-text">{{ question.text }}</span>
      </div>

      <div class="scale-buttons">
        <button
          v-for="num in scaleRange"
          :key="num"
          :class="['scale-button', { active: answers[question.key] === num }]"
          @click="selectValue(question.key, num)"
        >
          {{ num }}
        </button>
      </div>

      <p class="scale-label">{{ scaleLabel }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionScale",
  props: {
    title: {
      type: String,
      required: true
    },
    questions: {
      type: Array,
      required: true,
      // Example: [{ key: 'satisfaction', text: 'On a scale of 0 to 10, how satisfied are you...' }]
    },
    scaleMin: {
      type: Number,
      default: 0
    },
    scaleMax: {
      type: Number,
      default: 10
    },
    scaleLabel: {
      type: String,
      default: '(0 = very dissatisfied, 10 = extremely satisfied)'
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
  computed: {
    scaleRange() {
      const range = [];
      for (let i = this.scaleMin; i <= this.scaleMax; i++) {
        range.push(i);
      }
      return range;
    }
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
    selectValue(key, value) {
      this.answers[key] = value;
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
    margin: 0 0 50px 0;
  }
}

.scale-group {
  background: #E8E8E8;
  border-radius: 8px;
  padding: 40px 50px;
  margin-bottom: 30px;

  .scale-question {
    display: flex;
    gap: 15px;
    margin-bottom: 35px;
    align-items: flex-start;

    .bullet {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.2;
    }

    .question-text {
      flex: 1;
      font-family: 'Open Sans', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.4;
    }
  }

  .scale-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;

    .scale-button {
      width: 60px;
      height: 60px;
      background: white;
      border: 2px solid #D0D0D0;
      border-radius: 8px;
      font-family: 'Open Sans', sans-serif;
      font-size: 20px;
      font-weight: 400;
      color: #1a1a1a;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: #003595;
      }

      &.active {
        background: #003595;
        border-color: #003595;
        color: white;
        font-weight: 700;
      }
    }
  }

  .scale-label {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
    text-align: center;
    margin: 0;
  }
}
</style>
