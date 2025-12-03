import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
  state: () => ({
    pg: 0,
    tab: 0,
    comparisonSet: null,
  }),

  actions: {
    setPage(page) {
      this.pg = page;
    },

    setTab(tab) {
      this.tab = tab;
    },

    setComparisonSet(comparisonSet) {
      this.comparisonSet = comparisonSet;
    },

    reset() {
      this.pg = 0;
      this.tab = 0;
      this.comparisonSet = null;
    },
  },
});