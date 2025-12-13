<template>
  <div class="single-table">
    <div class="table-header">
      <p class="patient-count">
        <span class="count-number">{{ formatCount(productData.count) }}</span>
        <strong v-html="productData.displayName"></strong> patients
      </p>
    </div>
    <div class="table-content">
      <table class="acuity-table">
        <thead>
          <tr>
            <th class="acuity-label">Visual Acuity</th>
            <th v-for="(label, index) in measurementLabels" :key="index">
              {{ label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acuityValue in sortedAcuityValues" :key="acuityValue">
            <td class="acuity-label">{{ acuityValue }}</td>
            <td v-for="(questionId, index) in questionIds" :key="index">
              {{ getCount(questionId, acuityValue) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsSingleTable',
  props: {
    productData: { type: Object, required: true },
    questionIds: { type: Array, required: true },
    measurementLabels: { type: Array, required: true }
  },
  computed: {
    sortedAcuityValues() {
      // Collect all unique acuity values from this product
      const acuityValues = new Set();
      const aggregated = this.productData.aggregatedData || {};

      this.questionIds.forEach(qid => {
        if (aggregated[qid]) {
          Object.keys(aggregated[qid]).forEach(val => acuityValues.add(val));
        }
      });

      // Convert to array and sort logically (20/20, 20/25, 20/30, etc.)
      const values = Array.from(acuityValues);
      return values.sort((a, b) => {
        // Extract numerators and denominators
        const parseAcuity = (val) => {
          const match = val.match(/^(\d+)\/(\d+)$/);
          if (match) {
            return { numerator: parseInt(match[1]), denominator: parseInt(match[2]) };
          }
          return null;
        };

        const aVal = parseAcuity(a);
        const bVal = parseAcuity(b);

        if (aVal && bVal) {
          // Compare by denominator first (20/20 before 20/25)
          return aVal.denominator - bVal.denominator;
        }

        // Fallback to string comparison
        return a.localeCompare(b);
      });
    }
  },
  methods: {
    getCount(questionId, acuityValue) {
      const aggregated = this.productData.aggregatedData || {};
      const questionData = aggregated[questionId] || {};
      return questionData[acuityValue] || 0;
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
.single-table {
  width: 100%;
}

.table-header {
  text-align: center;
  margin-bottom: 20px;

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

.acuity-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Open Sans', sans-serif;

  thead {
    th {
      font-size: 15px;
      line-height: 1.3em;
      font-weight: 400;
      color: #454545;
      text-align: center;
      padding: 5px;

      &.acuity-label {
        text-align: left;
      }
    }
  }

  tbody {
    tr {
      td {
        font-size: 15px;
        line-height: 1.3em;
        font-weight: 700;
        color: #454545;
        text-align: center;
        padding: 5px;

        &.acuity-label {
          font-weight: 600;
          text-align: left;
        }
      }
    }
  }
}
</style>
