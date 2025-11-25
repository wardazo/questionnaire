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
          Patient Outcomes PCIOLs
        </p>
        <button>
          <img @click="m1 = true" src="./assets/img/close.svg" />
        </button>
      </div>
    </div>

    <div style="padding-top: 90px">
      <transition name="component-fade" mode="out-in">
        <component
          v-bind:is="currentPage"
          v-on:page-select="handlePageChange($event)"
          :page="page"
        >
        </component>
      </transition>
    </div>


  </div>
</template>

<script>
import Page0 from "./components/page0.vue";
import Page1 from "./components/page1.vue";
import Page2 from "./components/page2.vue";
import { usePageStore } from "./stores/page";

export default {
  name: "app",
  setup() {
    const pageStore = usePageStore();
    return { pageStore };
  },
  components: {

    Page0,
    Page1,
    Page2,

  },
  computed: {
    page() {
      return { pg: this.pageStore.pg, tab: this.pageStore.tab };
    },
    currentPage() {
      return "Page" + this.pageStore.pg;
    },

  },
  data() {
    return {

    };
  },
  methods: {
    close() {
      // eslint-disable-next-line
      Ti.App.fireEvent('closeOpenModal', {});
    },
    handlePageChange(pageData) {
      this.pageStore.setPage(pageData.pg);
      this.pageStore.setTab(pageData.tab);
    }
  },
  activated() {},
  mounted() {
  },

};
</script>

<style lang="scss">
#appx {
  min-height: 100vh;
  background: #FFF;
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



</style>
