<template>
  <div :class="['page' + page.pg]" id="appx">




    <div class="header">
      <div id="logo1">
        <!-- {{page.pg}}{{page.tab}} -->
        <transition
          name="custom-classes-transition"
          enter-active-class="bounceLeft-enter"
          leave-active-class="bounceRight-leave"
        >
          <img @click="pageStore.reset()" src="./assets/img/alcon.svg" />
        </transition>
      </div>
      <div class="header-right">
        <p class="has-text-main has-text-weight-light m-0">
          {{ $t('Patient Outcomes PCIOLs') }}
        </p>
        <button v-if="isTitaniumApp">
          <img @click="showCloseModal = true" src="./assets/img/close.svg" />
        </button>
      </div>
    </div>

    <div class="top-space">
      <div v-if="isInitializing" class="initialization-loading">
        <p>{{ $t('Loading...') }}</p>
      </div>
      <transition v-else name="component-fade" mode="out-in">
        <component
          v-bind:is="currentPage"
          v-on:page-select="handlePageChange($event)"
          :page="page"
        >
        </component>
      </transition>
    </div>

    <!-- Close Confirmation Modal -->
    <Modal v-if="showCloseModal">
      <template v-slot:body>
        <div class="close-modal-content">
          <h2 class="close-modal-title">{{ $t('Close Application') }}</h2>
          <p class="close-modal-message">{{ $t('Do you want to close this application?') }}</p>
          <div class="close-modal-buttons">
            <button class="btn-cancel" @click="showCloseModal = false">{{ $t('Cancel') }}</button>
            <button class="btn-close" @click="closeApplication">{{ $t('Close') }}</button>
          </div>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script>
import Page0 from "./components/page0.vue";
import Page1 from "./components/page1.vue";
import Page2 from "./components/page2.vue";
import Modal from "./components/Subcomp/Modal.vue";
import { usePageStore } from "./stores/page";
import { useSalesforceStore } from "./stores/salesforce";

export default {
  name: "app",
  setup() {
    const pageStore = usePageStore();
    const salesforceStore = useSalesforceStore();
    return { pageStore, salesforceStore };
  },
  components: {
    Page0,
    Page1,
    Page2,
    Modal,
  },
  computed: {
    page() {
      return { pg: this.pageStore.pg, tab: this.pageStore.tab };
    },
    currentPage() {
      return "Page" + this.pageStore.pg;
    },
    isTitaniumApp() {
      // eslint-disable-next-line
      return typeof Ti !== 'undefined';
    },
  },
  data() {
    return {
      isInitializing: true,
      showCloseModal: false,
    };
  },
  methods: {
    closeApplication() {
      // eslint-disable-next-line
      Ti.App.fireEvent('closeOpenModal', {});
    },
    handlePageChange(pageData) {
      this.pageStore.setPage(pageData.pg);
      this.pageStore.setTab(pageData.tab);
    }
  },
  activated() {},
  async mounted() {
    // Initialize Salesforce store before rendering pages
    //console.log('App.vue: Initializing Salesforce store...');
    await this.salesforceStore.initializeStore();
    //console.log('App.vue: Salesforce store initialized. Contact ID:', this.salesforceStore.salesforceContactId);
    this.isInitializing = false;
  },

};
</script>

<style lang="scss">
#appx {
  min-height: 100vh;
  background: #FFF;
}

.top-space {
  padding-top: 100px;

  @media only screen and (max-width: 1180px) {
    padding-top: 91px;
  }
}

.flex-is-9 {
  flex: 15;
}

.flex-is-3 img {
  vertical-align: middle;
  padding: 0 20px;
}

.component-fade-enter-active {
  transition: opacity 0.5s ease;
}

.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fadex-enter-active {
  transition: opacity 0.3s;
}

.fadex-enter,
.fadex-leave-to {
  opacity: 0;
}

input {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  width: inherit;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.initialization-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: #003595;
  font-family: 'Open Sans', sans-serif;
}

.close-modal-content {
  background: white;
  border-radius: 13px;
  padding: 40px;
  max-width: 500px;
  margin: 0 auto;
}

.close-modal-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px;
  font-family: 'Open Sans', sans-serif;
}

.close-modal-message {
  font-size: 18px;
  color: #1a1a1a;
  margin: 0 0 30px;
  font-family: 'Open Sans', sans-serif;
}

.close-modal-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.close-modal-buttons button {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Open Sans', sans-serif;
}

.btn-cancel {
  background: #E8E8E8;
  color: #1a1a1a;
}

.btn-cancel:hover {
  background: #D0D0D0;
  transform: translateY(-2px);
}

.btn-close {
  background: #003595;
  color: white;
}

.btn-close:hover {
  background: #002570;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 53, 149, 0.3);
}

</style>
