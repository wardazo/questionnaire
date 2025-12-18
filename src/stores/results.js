import { defineStore } from 'pinia';
import { getResultsData } from '@/services/api';
import { CHART_COLORS } from './resultsConfig';
import { useSalesforceStore } from './salesforce';

export const useResultsStore = defineStore('results', {
  state: () => ({
    currentComparisonSet: null,
    resultsData: null,
    isLoading: false,
    error: null
  }),

  getters: {
    product1Data: (state) => state.resultsData?.products?.product1 || null,
    product2Data: (state) => state.resultsData?.products?.product2 || null,

    hasData: (state) => {
      const p1 = state.resultsData?.products?.product1;
      const p2 = state.resultsData?.products?.product2;
      return (p1?.count > 0) || (p2?.count > 0);
    },

    // Transform aggregated data into Chart.js format for given questions
    getChartData: (state) => (productKey, questionIds, taskLabels) => {
      const product = state.resultsData?.products?.[productKey];
      if (!product || !product.aggregatedData) return null;

      const aggregated = product.aggregatedData;

      // Collect all unique answer values across questions
      const answerValues = new Set();
      questionIds.forEach(qid => {
        if (aggregated[qid]) {
          Object.keys(aggregated[qid]).forEach(val => answerValues.add(val));
        }
      });

      // Create datasets (one per answer value)
      const datasets = Array.from(answerValues).map(answerValue => {
        const data = questionIds.map(qid => {
          return aggregated[qid]?.[answerValue] || 0;
        });

        return {
          label: formatLabel(answerValue),
          data: data,
          backgroundColor: CHART_COLORS[answerValue] || '#ccc',
          borderRadius: 4
        };
      });

      return { labels: taskLabels, datasets };
    }
  },

  actions: {
    async fetchResults(comparisonSet) {
      this.isLoading = true;
      this.error = null;
      this.currentComparisonSet = comparisonSet;

      // Get account ID from Salesforce store
      const salesforceStore = useSalesforceStore();
      const accountId = salesforceStore.salesforceAccountId;

      if (!accountId) {
        this.error = {
          type: 'validation_error',
          message: 'Salesforce account ID not available'
        };
        this.isLoading = false;
        return;
      }

      try {
        const data = await getResultsData(comparisonSet, accountId);
        this.resultsData = data;
      } catch (error) {
        this.error = error;
        //console.error('Failed to fetch results:', error);
      } finally {
        this.isLoading = false;
      }
    },

    clearResults() {
      this.currentComparisonSet = null;
      this.resultsData = null;
      this.error = null;
    }
  }
});

// Helper function
function formatLabel(value) {
  // 'never' → 'Never', 'not_at_all' → 'Not at all'
  return value.split('_').map(w =>
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');
}
