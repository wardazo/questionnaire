<template>
  <div class="results-combined-section">
    <div class="section-title">&nbsp;
<!--      Visual acuity measurements -->
    </div>

    <div class="combined-container">
      <!-- Product 1 Table (Column 1, Row 1) -->
      <div class="grid-item table-item">
        <ResultsSingleTable
          :product-data="product1Data"
          :question-ids="acuityQuestionIds"
          :measurement-labels="acuityMeasurementLabels"
        />
      </div>

      <!-- Divider (Column 2, spans both rows) -->
      <div class="column-divider"></div>

      <!-- Product 2 Table (Column 3, Row 1) -->
      <div class="grid-item table-item">
        <ResultsSingleTable
          :product-data="product2Data"
          :question-ids="acuityQuestionIds"
          :measurement-labels="acuityMeasurementLabels"
        />
      </div>

      <!-- Product 1 Satisfaction Meter (Column 1, Row 2) -->
      <div class="grid-item satisfaction-item">
        <ResultsSingleSatisfactionMeter
          :product-data="product1Data"
          :question-id="satisfactionQuestionId"
        />
      </div>

      <!-- Product 2 Satisfaction Meter (Column 3, Row 2) -->
      <div class="grid-item satisfaction-item">
        <ResultsSingleSatisfactionMeter
          :product-data="product2Data"
          :question-id="satisfactionQuestionId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ResultsSingleTable from './ResultsSingleTable.vue';
import ResultsSingleSatisfactionMeter from './ResultsSingleSatisfactionMeter.vue';

export default {
  name: 'ResultsVisualAcuitySatisfaction',
  components: {
    ResultsSingleTable,
    ResultsSingleSatisfactionMeter
  },
  props: {
    product1Data: { type: Object, required: true },
    product2Data: { type: Object, required: true },
    acuityQuestionIds: { type: Array, required: true },
    acuityMeasurementLabels: { type: Array, required: true },
    satisfactionQuestionId: { type: String, required: true }
  }
};
</script>

<style lang="scss" scoped>
.results-combined-section {
  padding: 0 0 0px;
}

.section-title {
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

.combined-container {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  grid-template-rows: auto auto;
  column-gap: 20px;
  row-gap: 40px;
  background: #F2F2F2;
  padding: 30px;
  border-radius: 13px;
}

.grid-item {
  display: flex;
  flex-direction: column;
}

.table-item:nth-of-type(1) {
  grid-column: 1;
  grid-row: 1;
}

.table-item:nth-of-type(2) {
  grid-column: 3;
  grid-row: 1;
}

.satisfaction-item:nth-of-type(1) {
  grid-column: 1;
  grid-row: 2;
}

.satisfaction-item:nth-of-type(2) {
  grid-column: 3;
  grid-row: 2;
}

.column-divider {
  width: 1px;
  background: #000;
  grid-column: 2;
  grid-row: 1 / 3;
}
</style>
