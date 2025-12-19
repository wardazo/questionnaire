<template>
  <div class="single-satisfaction-meter">
    <div class="meter-header">
      <p class="patient-count">
        {{ $t('Patient satisfaction') }}
      </p>
    </div>
    <div class="meter-content">
      <div class="meter-bar-container">
        <div class="meter-bar">
          <div
            class="meter-fill"
            :style="{ width: `${calculateAverage() * 10}%` }"
          ></div>
          <div
            class="meter-indicator"
            :style="{ left: `${calculateAverage() * 10}%` }"
          >
            <span class="indicator-number">{{ Math.round(calculateAverage()) }}</span>
          </div>
        </div>
        <div class="meter-labels">
          <span>0</span>
          <span>10</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsSingleSatisfactionMeter',
  props: {
    productData: { type: Object, required: true },
    questionId: { type: String, required: true }
  },
  methods: {
    calculateAverage() {
      const aggregated = this.productData.aggregatedData || {};
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
    }
  }
};
</script>

<style lang="scss" scoped>
.single-satisfaction-meter {
  width: 100%;
}

.meter-header {
  text-align: center;
  margin-bottom: 30px;

  .patient-count {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 50px;
    color: #1a1a1a;

    strong {
      font-weight: 700;
    }
  }
}

.meter-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.meter-bar-container {
  width: 90%;
}

.meter-bar {
  position: relative;
  height: 20px;
  background: #D0D0D0;
  border-radius: 12px;
  margin-bottom: 10px;
  overflow: visible;

  .meter-fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #1CE254;
    border-radius: 12px;
    transition: width 0.3s ease;
  }

  .meter-indicator {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: #003595;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    .indicator-number {
      font-family: 'Open Sans', sans-serif;
      font-size: 36px;
      font-weight: 700;
      color: white;
      line-height: 1;
    }
  }
}

.meter-labels {
  display: flex;
  justify-content: space-between;
  padding: 0;
  position: relative;

  span {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;

    &:first-child {
      position: absolute;
      left: -10px;
      top: -29px;
    }

    &:last-child {
      position: absolute;
      right: -20px;
      top: -29px;
    }
  }
}
</style>
