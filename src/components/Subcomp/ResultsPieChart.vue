<template>
  <div class="results-pie-section">
    <!-- Render each question as a separate row of pie charts -->
    <div
      v-for="(question, qIndex) in questionConfigs"
      :key="qIndex"
      class="question-row"
    >
      <h3 class="question-title">{{ question.title }}</h3>

      <div class="pie-charts-container">
        <!-- Product 1 Pie Chart -->
        <div class="pie-chart-wrapper">
          <div class="chart-header">
            <p class="patient-count">
              <span class="count-number">{{ formatCount(product1Data.count) }}</span>
              <strong v-html="product1Data.displayName"></strong> patients
            </p>
          </div>
          <div class="chart-canvas-wrapper">
            <Pie :data="getChartData(product1Data, question.questionId)" :options="pieOptions" />
          </div>
        </div>

        <!-- Divider -->
        <div class="chart-divider"></div>

        <!-- Product 2 Pie Chart -->
        <div class="pie-chart-wrapper">
          <div class="chart-header">
            <p class="patient-count">
              <span class="count-number">{{ formatCount(product2Data.count) }}</span>
              <strong v-html="product2Data.displayName"></strong> patients
            </p>
          </div>
          <div class="chart-canvas-wrapper">
            <Pie :data="getChartData(product2Data, question.questionId)" :options="pieOptions" />
          </div>
        </div>

        <!-- Shared Legend -->
        <div class="chart-legend">
          <div
            v-for="(label, index) in getLegendLabels(question.questionId)"
            :key="index"
            class="legend-item"
          >
            <span
              class="legend-color"
              :style="{ backgroundColor: getLegendColor(label) }"
            ></span>
            <span class="legend-text">{{ formatLabel(label) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CHART_COLORS } from '@/stores/resultsConfig';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default {
  name: 'ResultsPieChart',
  components: { Pie },
  props: {
    product1Data: { type: Object, required: true },
    product2Data: { type: Object, required: true },
    questionConfigs: {
      type: Array,
      required: true,
      // Array of { questionId, title }
    }
  },
  computed: {
    pieOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false // We'll use custom legend on the right
          },
          datalabels: {
            color: '#1a1a1a',
            font: {
              size: 14,
              weight: 'bold',
              family: 'Open Sans'
            },
            formatter: (value, context) => {
              // Calculate percentage
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              if (total === 0) return '';
              const percentage = Math.round((value / total) * 100);
              return percentage > 0 ? `${percentage}%` : '';
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      };
    }
  },
  methods: {
    getChartData(productData, questionId) {
      const aggregated = productData.aggregatedData || {};
      const questionData = aggregated[questionId] || {};

      // Get all answer values for this question
      const answerValues = Object.keys(questionData);

      // Sort answer values in a logical order
      const orderedValues = this.sortAnswerValues(answerValues);

      const data = orderedValues.map(val => questionData[val] || 0);
      const backgroundColors = orderedValues.map(val => CHART_COLORS[val] || '#ccc');

      return {
        labels: orderedValues.map(val => this.formatLabel(val)),
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      };
    },

    getLegendLabels(questionId) {
      // Get unique answer values from both products for this question
      const agg1 = this.product1Data.aggregatedData || {};
      const agg2 = this.product2Data.aggregatedData || {};

      const values = new Set([
        ...Object.keys(agg1[questionId] || {}),
        ...Object.keys(agg2[questionId] || {})
      ]);

      return this.sortAnswerValues(Array.from(values));
    },

    getLegendColor(answerValue) {
      return CHART_COLORS[answerValue] || '#ccc';
    },

    sortAnswerValues(values) {
      // Define logical order for different answer types
      const orders = {
        // Radio options
        never: 0,
        occasionally: 1,
        often: 2,
        always: 3,

        // Bothersome options
        not_at_all: 0,
        a_little: 1,
        moderately: 2,
        significantly: 3,

        // Clarity options
        very_clear: 0,
        somewhat_clear: 1,
        slightly_blurry: 2,
        very_blurry: 3,

        // Evening options
        evening: 0,
        watching_tv: 1,
        low_light: 2,
        no_specific_time: 3
      };

      return values.sort((a, b) => {
        const orderA = orders[a] !== undefined ? orders[a] : 999;
        const orderB = orders[b] !== undefined ? orders[b] : 999;
        return orderA - orderB;
      });
    },

    formatLabel(value) {
      // 'never' → 'Never', 'not_at_all' → 'Not at all'
      return value.split('_').map(w =>
        w.charAt(0).toUpperCase() + w.slice(1)
      ).join(' ');
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
.results-pie-section {
  padding: 0 0 24px;
}

.question-row {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  .question-title {
    max-width: 640px;
    width: 100%;
    font-size: 20px;
    line-height: 1.24em;
    font-weight: 700;
    color: #000000;
    margin: 0 0 10px;

    @media only screen and (max-width: 1180px) {
      font-size: 18px;
    }
  }
}

.pie-charts-container {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 200px;
  gap: 40px;
  background: #E8E8E8;
  padding: 30px;
  border-radius: 8px;
  align-items: center;
}

.pie-chart-wrapper {
  .chart-header {
    text-align: center;
    margin-bottom: 24px;

    .patient-count {
      font-size: 20px;
      line-height: 1.36em;
      color: #000;
      margin: 0;

      .count-number {
        font-size: 20px;
        line-height: 1.36em;
        font-weight: 400;
        margin-right: 5px;
      }

      strong {
        font-weight: 700;
      }
    }
  }

  .chart-canvas-wrapper {
    max-width: 150px;
    margin: 0 auto;
  }
}

.chart-divider {
  width: 1px;
  height: 100%;
  background: #000;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 20px;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;

    .legend-color {
      width: 22px;
      height: 14px;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .legend-text {
      font-size: 14px;
      letter-spacing: -0.015em;
      color: #000;
    }
  }
}
</style>
