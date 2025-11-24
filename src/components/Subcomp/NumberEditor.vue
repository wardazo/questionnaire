<!-- components/NumberEditor.vue -->
<template>
  <VDropdown>
    <span
      @mouseenter="showPopover = true"
      @mouseleave="showPopover = false"
      class="cursor-pointer"
    >
      {{ modelValue }}
    </span>

    <template #popper>
      <div class="popper-tooltip">
        <div class="is-flex is-align-items-center">
          <button v-if="showButtons !== false" @click="updateValue(modelValue - 1)" style="position: relative; top: -4px;">-</button>
          <span class="input-wrap">
            <input
              :value="modelValue"
              @input="updateValue($event.target.value)"
              type="number"
            />
          </span>
          <button v-if="showButtons  !== false" @click="updateValue(modelValue + 1)">+</button>
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<script>
import { useMetricsStore } from "@/stores/data";

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    showButtons: {
      type: Boolean,
      required: false,
      default: true,

    },
    field: String,
    dayIndex: Number,
    week: Number,
  },

  data() {
    return {
      showPopover: false,
    };
  },

  methods: {
    updateValue(newValue) {

      //if is sring the convert to number
      if (typeof newValue === 'string') {
        newValue = Number(newValue);
      }

      // Emit the update for v-model
      this.$emit('update:modelValue', newValue);

      // For regular week data, update through store
      const store = useMetricsStore();
      store.updateDayField(this.week, this.dayIndex, this.field, newValue);
      store.calculateMetrics();
    },
  },
};
</script>

<style lang="scss" scoped>
.popper-tooltip {
  background: #003594;
  border: 1px solid #003594;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, .16);
  border-radius: 9px;
  padding: 15px 27px;

  .input-wrap {
    display: block;
    width: 115px;
    margin: 0 29px;

    input {
      display: block;
      width: 100%;
      height: 61px;
      line-height: 61px;
      font-size: 49px;
      font-weight: 400;
      color: #003594;
      background: #FFF;
      border-radius: 7px;
      border: 0 none;
      padding: 0 5px;

      &:focus {
        outline: 0;
      }
    }

    input::placeholder {
      color: #003594;
      opacity: 1;
    }

    input::-ms-input-placeholder {
      color: #003594;
    }
  }

  button {
    display: flex;
    align-items: center;
    border: 0 none;
    padding: 0;
    font-size: 50px;
    line-height: 1em;
    font-weight: 700;
    color: #FFF;
    background: transparent;

    &:focus {
      outline: 0;
    }
  }
}
</style>
