<template>
  <div class="results-combined-section">
    <!-- Visual Acuity Table -->
    <ResultsTable
      :product1-data="product1Data"
      :product2-data="product2Data"
      :question-ids="acuityQuestionIds"
      :measurement-labels="acuityMeasurementLabels"
    />

    <!-- Satisfaction Meter -->
    <ResultsSatisfactionMeter
      :product1-data="product1Data"
      :product2-data="product2Data"
      :question-id="satisfactionQuestionId"
    />
  </div>
</template>

<script>
import ResultsTable from './ResultsTable.vue';
import ResultsSatisfactionMeter from './ResultsSatisfactionMeter.vue';

export default {
  name: 'ResultsVisualAcuitySatisfaction',
  components: {
    ResultsTable,
    ResultsSatisfactionMeter
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
  display: flex;
  flex-direction: column;
}
</style>
