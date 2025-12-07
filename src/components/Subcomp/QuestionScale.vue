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
}

.scale-question {
  display: flex;
  gap: 13px;
  margin-bottom: 56px;

  .bullet {
    font-size: 20px;
    line-height: 1.36em;
    font-weight: 700;
    color: #000;
  }

  .question-text {
    display: flex;
    font-size: 20px;
    line-height: 1.36em;
    font-weight: 700;
    color: #000;

    strong {
      font-weight: 700;
      margin-right: 6px;
    }

    span {
      font-weight: 400;
    }
  }
}

.scale-group {
  background: #F2F2F2;
  border-radius: 13px;
  padding: 100px 24px 160px;
  margin-bottom: 24px;

  @media only screen and (max-width: 1024px) {
    padding: 80px 24px 120px;
  }

  .scale-buttons {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-bottom: 28px;

    .scale-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 61px;
      height: 80px;
      background: white;
      border: 1px solid #A8A8A8;
      border-radius: 8px;
      font-size: 30px;
      line-height: 1em;
      font-weight: 400;
      color: #242424;
      cursor: pointer;
      transition: all 0.2s;

      @media only screen and (max-width: 1024px) {
        width: 56px;
        font-size: 26px;
      }

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
    font-size: 15px;
    line-height: 1.36em;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: #000;
    text-align: center;
    margin: 0;
  }
}
</style>
