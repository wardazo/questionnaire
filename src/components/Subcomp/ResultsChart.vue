<template>
  <div class="results-chart-section">
    <div v-if="subtitle" class="section-header">
      <p class="section-subtitle">{{ subtitle }}</p>
    </div>

    <div class="charts-container">
      <!-- Product 1 Chart -->
      <div class="chart-wrapper">
        <div class="chart-header">
          <p class="patient-count">
            <span class="count-number">{{ formatCount(product1Data.count) }}</span>
            <strong v-html="product1Data.displayName"></strong> patients
          </p>
        </div>
        <div class="chart-canvas-wrapper">
          <Bar :data="product1ChartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Divider -->
      <div class="chart-divider"></div>

      <!-- Product 2 Chart -->
      <div class="chart-wrapper">
        <div class="chart-header">
          <p class="patient-count">
            <span class="count-number">{{ formatCount(product2Data.count) }}</span>
            <strong v-html="product2Data.displayName"></strong> patients
          </p>
        </div>
        <div class="chart-canvas-wrapper">
          <Bar :data="product2ChartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { CHART_COLORS } from '@/stores/resultsConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  name: 'ResultsChart',
  components: { Bar },
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    product1Data: { type: Object, required: true },
    product2Data: { type: Object, required: true },
    questionIds: { type: Array, required: true },
    taskLabels: { type: Array, required: true }
  },
  computed: {
    product1ChartData() {
      return this.transformToChartData(this.product1Data);
    },
    product2ChartData() {
      return this.transformToChartData(this.product2Data);
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        },
        datasets: {
          bar: {
            barPercentage: 0.9,
            categoryPercentage: 0.8,
            maxBarThickness: 60
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: { size: 12, family: 'Open Sans' }
            }
          },
          datalabels: {
            display: false
          }
        }
      };
    }
  },
  methods: {
    transformToChartData(productData) {
      const aggregated = productData.aggregatedData || {};
      const labels = this.taskLabels;

      // Define all possible answer values for each option type
      const allPossibleAnswers = {
        'RADIO_OPTIONS': ['never', 'occasionally', 'often', 'always'],
        'BOTHERSOME_OPTIONS': ['not_at_all', 'a_little', 'moderately', 'significantly'],
        'CLARITY_OPTIONS': ['very_clear', 'somewhat_clear', 'slightly_blurry', 'very_blurry']
      };

      // Collect answer values that exist in the data
      const existingAnswerValues = new Set();
      this.questionIds.forEach(qid => {
        if (aggregated[qid]) {
          Object.keys(aggregated[qid]).forEach(val => existingAnswerValues.add(val));
        }
      });

      // Determine which option type we're using based on existing values
      let answerValuesToUse = [];
      if (existingAnswerValues.has('never') || existingAnswerValues.has('occasionally') ||
          existingAnswerValues.has('often') || existingAnswerValues.has('always')) {
        answerValuesToUse = allPossibleAnswers['RADIO_OPTIONS'];
      } else if (existingAnswerValues.has('not_at_all') || existingAnswerValues.has('a_little') ||
                 existingAnswerValues.has('moderately') || existingAnswerValues.has('significantly')) {
        answerValuesToUse = allPossibleAnswers['BOTHERSOME_OPTIONS'];
      } else if (existingAnswerValues.has('very_clear') || existingAnswerValues.has('somewhat_clear') ||
                 existingAnswerValues.has('slightly_blurry') || existingAnswerValues.has('very_blurry')) {
        answerValuesToUse = allPossibleAnswers['CLARITY_OPTIONS'];
      } else {
        // Fallback to existing values if we can't determine the type
        answerValuesToUse = Array.from(existingAnswerValues);
      }

      // Create datasets (one per answer value) - always include all options
      const datasets = answerValuesToUse.map(answerValue => {
        const data = this.questionIds.map(qid => {
          return aggregated[qid]?.[answerValue] || 0;
        });

        return {
          label: this.formatLabel(answerValue),
          data: data,
          backgroundColor: CHART_COLORS[answerValue] || '#ccc'
        };
      });

      return { labels, datasets };
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
.results-chart-section {
  padding: 0 0 24px;
}

.section-header {
  margin-bottom: 10px;

  .section-subtitle {
    max-width: 640px;
    width: 100%;
    font-size: 20px;
    line-height: 1.24em;
    font-weight: 700;
    color: #000000;
    margin: 0;

    @media only screen and (max-width: 1180px) {
      font-size: 18px;
    }
  }
}

.charts-container {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 40px;
  background: #F2F2F2;
  padding: 36px 30px;
  border-radius: 13px;
}

.chart-wrapper {
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
    height: 400px;
  }
}

.chart-divider {
  width: 1px;
  background: #000;
}
</style>
