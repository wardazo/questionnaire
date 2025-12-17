import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
  state: () => ({
    pg: 0,
    tab: 0,
    comparisonSet: null,
    // Page0 state management
    page0View: 'selection', // 'selection' | 'product'
    page0SelectedPair: null, // null | 'vivity-puresee' | 'panoptix-odyssey' | 'panoptix-galaxy'
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

    setPage0View(view) {
      this.page0View = view;
    },

    setPage0SelectedPair(pair) {
      this.page0SelectedPair = pair;
    },

    reset() {
      this.pg = 0;
      this.tab = 0;
      this.comparisonSet = null;
      this.page0View = 'selection';
      this.page0SelectedPair = null;
    },
  },
});