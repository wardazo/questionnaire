<template>
  <div class="question-section">
    <h1 class="section-title">{{ title }}</h1>

    <!-- Loop through all questions -->
    <div
      v-for="(question, index) in questions"
      :key="question.key"
      class="question-group"
    >
      <p class="question-text">{{ question.text }}</p>
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
  </div>
</template>

<script>
export default {
  name: "QuestionDualRadio",
  props: {
    title: {
      type: String,
      required: true
    },
    questions: {
      type: Array,
      required: true,
      // Example: [
      //   { key: 'shadowGhost', text: 'Do you ever notice...', options: [...] },
      //   { key: 'whenNoticed', text: 'If yes, when...', options: [...] },
      //   ...
      // ]
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
}

.question-group {
  background: #E8E8E8;
  border-radius: 8px;
  padding: 30px 40px;
  margin-bottom: 30px;

  .question-text {
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
