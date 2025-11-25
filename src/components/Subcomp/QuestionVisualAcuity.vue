<template>
  <div class="question-section">
    <h1 class="section-title">{{ title }}</h1>

    <div class="measurements-container">
      <div
        v-for="(measurement, index) in measurements"
        :key="index"
        class="measurement-item"
      >
        <div class="measurement-icon" v-if="measurement.icon">
          <img :src="measurement.icon" :alt="measurement.label" />
        </div>
        <div class="measurement-label">{{ measurement.label }}</div>
        <div class="measurement-input">
          <select
            v-model="answers[measurement.key]"
            @change="emitChange"
            class="measurement-select"
          >
            <option value="">Select</option>
            <option
              v-for="option in measurement.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionVisualAcuity",
  props: {
    title: {
      type: String,
      required: true
    },
    measurements: {
      type: Array,
      required: true,
      // Example: [{ key: 'unva', label: 'UNVA (40cm)', icon: '/path/to/icon.svg', options: ['20/20', '20/25', ...] }]
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
    margin: 0 0 50px 0;
  }
}

.measurements-container {
  background: #E8E8E8;
  border-radius: 8px;
  padding: 60px 80px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 60px;
}

.measurement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1;

  .measurement-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .measurement-label {
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    text-align: center;
  }

  .measurement-input {
    width: 100%;
    max-width: 200px;
  }

  .measurement-select {
    width: 100%;
    height: 50px;
    background: white;
    border: 2px solid #D0D0D0;
    border-radius: 8px;
    padding: 10px 15px;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: #1a1a1a;
    cursor: pointer;
    transition: all 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 15px center;
    background-size: 20px;
    padding-right: 45px;

    &:hover {
      border-color: #003595;
    }

    &:focus {
      outline: none;
      border-color: #003595;
    }
  }
}
</style>
