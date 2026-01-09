<template>
  <div class="question-section">
    <h1 class="section-title">{{ title }}</h1>

    <div
      class="measurements-container"
      :class="{ 'four-items': measurements.length === 4 }"
    >
      <div
        v-for="(measurement, index) in measurements"
        :key="index"
        class="measurement-item"
      >
        <!-- <div class="measurement-icon" v-if="measurement.icon">
          <img :src="measurement.icon" :alt="measurement.label" />
        </div> -->
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
      answers: this.initializeAnswers()
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
  mounted() {
    // Emit initial default values on mount
    this.emitChange();
  },
  methods: {
    initializeAnswers() {
      // Start with existing modelValue
      const initialAnswers = { ...this.modelValue };

      // Set default value of "20/20" for any measurement that doesn't have a value
      this.measurements.forEach(measurement => {
        if (!initialAnswers[measurement.key]) {
          initialAnswers[measurement.key] = '20/20';
        }
      });

      return initialAnswers;
    },
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
    margin: 0 0 24px;

    @media only screen and (max-width: 1180px) {
      font-size: 32px;
    }

    @media only screen and (max-width: 1024px) {
      font-size: 30px;
    }
  }
}

.measurements-container {
  background: #F2F2F2;
  border-radius: 13px;
  padding: 200px 40px 180px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  // 2 rows of 2 when there are 4 measurements
  &.four-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 80px 40px;
    justify-items: center;
    padding: 100px 100px 100px;

    @media only screen and (max-width: 1180px) {
      gap: 60px 30px;
      padding: 80px 80px;
    }

    @media only screen and (max-width: 1024px) {
      gap: 40px 20px;
      padding: 60px 60px;
    }
  }
}

.measurement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
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
    font-size: 20px;
    line-height: 1.3em;
    font-weight: 700;
    color: #000;
    letter-spacing: -0.015em;
    text-align: center;
    margin-bottom: 16px;
  }

  .measurement-input {
    width: 100%;
    max-width: 200px;

    @media only screen and (max-width: 1180px) {
      max-width: 180px;
    }

    @media only screen and (max-width: 1024px) {
      max-width: 150px;
    }
  }

  .measurement-select {
    width: 100%;
    height: 56px;
    background: white;
    border: 1px solid #BCBCBC;
    border-radius: 8px;
    padding: 5px 15px;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    line-height: 1em;
    font-weight: 400;
    color: #242424;
    cursor: pointer;
    transition: all 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.75586 -6.83503e-07L5.63477 9.38477L4.67773 9.38477L-4.54616e-07 -2.57061e-07L1.45508 -3.20664e-07L5.07812 7.63672L8.28125 -6.19045e-07L9.75586 -6.83503e-07Z' fill='%23242424'/%3E%3C/svg%3E%0A");
    background-size: 10px 10px;
    background-repeat: no-repeat;
    background-position: right 24px center;
    padding-right: 45px;
    text-align: center;
    text-align-last:center;

    @media only screen and (max-width: 1180px) {
      font-size: 18px;
      background-position: right 16px center;
      padding-right: 36px;
    }

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
