import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
  state: () => ({
    pg: 0,
    tab: 0,
  }),

  actions: {
    setPage(page) {
      this.pg = page;
    },

    setTab(tab) {
      this.tab = tab;
    },

    reset() {
      this.pg = 0;
      this.tab = 0;
    },
  },
});