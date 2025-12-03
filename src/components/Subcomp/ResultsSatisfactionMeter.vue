<template>
  <div class="results-satisfaction-section">
    <div class="section-title">Patient satisfaction</div>

    <div class="meters-container">
      <!-- Product 1 Meter -->
      <div class="meter-wrapper">
        <div class="meter-header">
          <p class="patient-count">
            <span class="count-number">{{ formatCount(product1Data.count) }}</span>
            <strong v-html="product1Data.displayName"></strong> patients
          </p>
        </div>
        <div class="meter-content">
          <div class="average-display">
            <span class="average-number">{{ calculateAverage(product1Data) }}</span>
            <span class="average-scale">/10</span>
          </div>
          <div class="meter-bar-container">
            <div class="meter-bar">
              <div
                class="meter-indicator"
                :style="{ left: `${calculateAverage(product1Data) * 10}%` }"
              ></div>
            </div>
            <div class="meter-labels">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="meter-divider"></div>

      <!-- Product 2 Meter -->
      <div class="meter-wrapper">
        <div class="meter-header">
          <p class="patient-count">
            <span class="count-number">{{ formatCount(product2Data.count) }}</span>
            <strong v-html="product2Data.displayName"></strong> patients
          </p>
        </div>
        <div class="meter-content">
          <div class="average-display">
            <span class="average-number">{{ calculateAverage(product2Data) }}</span>
            <span class="average-scale">/10</span>
          </div>
          <div class="meter-bar-container">
            <div class="meter-bar">
              <div
                class="meter-indicator"
                :style="{ left: `${calculateAverage(product2Data) * 10}%` }"
              ></div>
            </div>
            <div class="meter-labels">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsSatisfactionMeter',
  props: {
    product1Data: { type: Object, required: true },
    product2Data: { type: Object, required: true },
    questionId: { type: String, required: true }
  },
  methods: {
    calculateAverage(productData) {
      const aggregated = productData.aggregatedData || {};
      const questionData = aggregated[this.questionId] || {};

      let totalScore = 0;
      let totalCount = 0;

      Object.entries(questionData).forEach(([score, count]) => {
        const numScore = parseInt(score);
        const numCount = parseInt(count);

        if (!isNaN(numScore) && !isNaN(numCount)) {
          totalScore += numScore * numCount;
          totalCount += numCount;
        }
      });

      if (totalCount === 0) return '0.0';

      const average = totalScore / totalCount;
      return average.toFixed(1);
    },

    formatCount(count) {
      if (count === 0) return '00';
      if (count < 10) return '0' + count;
      return String(count);
    }
  }
};
</script>

<style lang="scss" scoped>
.results-satisfaction-section {
  padding: 40px 0;
}

.section-title {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 30px;
}

.meters-container {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 40px;
  background: #E8E8E8;
  padding: 30px;
  border-radius: 8px;
}

.meter-wrapper {
  .meter-header {
    text-align: center;
    margin-bottom: 30px;

    .patient-count {
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      color: #1a1a1a;
      margin: 0;

      .count-number {
        font-size: 18px;
        font-weight: 700;
        margin-right: 5px;
      }

      strong {
        font-weight: 700;
      }
    }
  }

  .meter-content {
    background: white;
    padding: 40px 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.average-display {
  margin-bottom: 30px;
  text-align: center;

  .average-number {
    font-family: 'Open Sans', sans-serif;
    font-size: 72px;
    font-weight: 300;
    color: #4CAF50;
    line-height: 1;
  }

  .average-scale {
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    font-weight: 300;
    color: #1a1a1a;
    margin-left: 5px;
  }
}

.meter-bar-container {
  width: 100%;
  max-width: 400px;
}

.meter-bar {
  position: relative;
  height: 40px;
  background: linear-gradient(to right, #FF5722 0%, #ffac1c 50%, #4CAF50 100%);
  border-radius: 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .meter-indicator {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid #003595;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

.meter-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;

  span {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
  }
}

.meter-divider {
  width: 1px;
  background: #D0D0D0;
}
</style>
