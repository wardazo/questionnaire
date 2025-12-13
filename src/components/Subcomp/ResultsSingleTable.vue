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
            <th class="acuity-label"></th>
            <th v-for="(label, index) in measurementLabels" :key="index">
              <div class="measurement-header">
                <div class="measurement-name">{{ label.name }}</div>
                <div class="measurement-distance">{{ label.distance }}</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="acuity-label">Highest</td>
            <td v-for="(questionId, index) in questionIds" :key="index">
              {{ getStatValue(questionId, 'highest') }}
            </td>
          </tr>
          <tr>
            <td class="acuity-label">Lowest</td>
            <td v-for="(questionId, index) in questionIds" :key="index">
              {{ getStatValue(questionId, 'lowest') }}
            </td>
          </tr>
          <tr>
            <td class="acuity-label">Median</td>
            <td v-for="(questionId, index) in questionIds" :key="index">
              {{ getStatValue(questionId, 'median') }}
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
  computed: {},
  methods: {
    parseAcuity(val) {
      const match = val.match(/^(\d+)\/(\d+)$/);
      if (match) {
        return { numerator: parseInt(match[1]), denominator: parseInt(match[2]) };
      }
      return null;
    },

    getSortedAcuityValues(questionId) {
      const aggregated = this.productData.aggregatedData || {};
      const questionData = aggregated[questionId] || {};
      const acuityValues = Object.keys(questionData);

      return acuityValues.sort((a, b) => {
        const aVal = this.parseAcuity(a);
        const bVal = this.parseAcuity(b);

        if (aVal && bVal) {
          // Compare by denominator first (20/20 before 20/25)
          return aVal.denominator - bVal.denominator;
        }

        return a.localeCompare(b);
      });
    },

    getStatValue(questionId, stat) {
      const aggregated = this.productData.aggregatedData || {};
      const questionData = aggregated[questionId] || {};

      // Create an array of all individual responses by repeating acuity values by their counts
      const allResponses = [];
      Object.keys(questionData).forEach(acuityValue => {
        const count = questionData[acuityValue];
        for (let i = 0; i < count; i++) {
          allResponses.push(acuityValue);
        }
      });

      if (allResponses.length === 0) return '-';

      // Sort responses (best to worst: 20/20, 20/25, 20/30, etc.)
      allResponses.sort((a, b) => {
        const aVal = this.parseAcuity(a);
        const bVal = this.parseAcuity(b);

        if (aVal && bVal) {
          return aVal.denominator - bVal.denominator;
        }

        return a.localeCompare(b);
      });

      if (stat === 'highest') {
        // Best vision is first in sorted array
        return allResponses[0];
      } else if (stat === 'lowest') {
        // Worst vision is last in sorted array
        return allResponses[allResponses.length - 1];
      } else if (stat === 'median') {
        // Median is middle value (or average of two middle values for even count)
        const middleIndex = Math.floor(allResponses.length / 2);
        if (allResponses.length % 2 === 0) {
          // Even number: return the lower middle value for simplicity
          return allResponses[middleIndex - 1];
        } else {
          // Odd number: return exact middle
          return allResponses[middleIndex];
        }
      }

      return '-';
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
    font-size: 24px;
    color: #1a1a1a;
    margin: 0;

    .count-number {
      font-size: 27px;
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
      padding: 5px 5px 12px;
      vertical-align: top;

      &.acuity-label {
        text-align: left;
      }

      .measurement-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;

        .measurement-name {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          line-height: 1.2;
        }

        .measurement-distance {
          font-size: 16px;
          font-weight: 400;
          color: #454545;
          line-height: 1.2;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        font-size: 20px;
        line-height: 1.3;
        font-weight: 700;
        color: #000000;
        text-align: center;
        padding: 8px 5px;

        &.acuity-label {
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          color: #454545;
        }
      }
    }
  }
}
</style>
