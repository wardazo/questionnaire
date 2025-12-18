import { defineStore } from "pinia";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useSalesforceStore = defineStore("salesforce", {
  state: () => ({
    pitcherData: null,
  }),

  actions: {
    async initializeStore() {
      if (typeof Ti !== "undefined") {
        await delay(700);
        this.pitcherData = window.externalData;
      } else {
        this.pitcherData = true;
      }
    },
  },

  getters: {
    isInitialized: (state) => Boolean(state.pitcherData),

    salesforceId: (state) =>
      state.pitcherData?.user?.Id ?? "BROWSER_TEST_ID",

    salesforceName: (state) =>
      state.pitcherData?.user?.Name ?? "BROWSER_TEST_USER",

    salesforceAccountId: (state) =>
        state.pitcherData?.account?.Id ?? "BROWSER_TEST_ACCOUNT_ID",

    salesforceAccountName: (state) =>
        state.pitcherData?.account?.Name ?? "BROWSER_TEST_ACCOUNT_USER",

    salesforceContactId: (state) =>
        state.pitcherData?.contact?.Id ?? "BROWSER_TEST_CONTACT_ID",

    salesforceContactName: (state) =>
        state.pitcherData?.contact?.Name ?? "BROWSER_TEST_CONTACT_USER",

    hasPitcherAccount: (state) => {
      return Boolean(state.pitcherData?.user);
    },
  },
});
