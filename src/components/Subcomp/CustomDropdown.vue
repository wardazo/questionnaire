<template>
  <div class="custom-dropdown" :class="{ 'is-open': isOpen }" ref="dropdownRef">
    <button
      class="dropdown-toggle"
      :class="{ 'has-selection': modelValue !== null }"
      @click="toggleDropdown"
      type="button"
    >
      <span v-if="modelValue === null" class="placeholder">{{ placeholder }}</span>
      <span v-else v-html="selectedLabel"></span>
      <svg
        class="dropdown-arrow"
        :class="{ 'is-open': isOpen }"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L6 6L11 1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <transition name="dropdown-fade">
      <div v-if="isOpen" class="dropdown-menu">
        <button
          v-for="option in options"
          :key="option.value"
          class="dropdown-option"
          :class="{ 'is-selected': modelValue === option.value }"
          @click="selectOption(option.value)"
          type="button"
        >
          <span v-html="option.label"></span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CustomDropdown',
  props: {
    modelValue: {
      type: [String, Number, null],
      default: null
    },
    options: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(option =>
          Object.prototype.hasOwnProperty.call(option, 'value') &&
          Object.prototype.hasOwnProperty.call(option, 'label')
        );
      }
    },
    placeholder: {
      type: String,
      default: 'Please select one'
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    selectedLabel() {
      const selected = this.options.find(opt => opt.value === this.modelValue);
      return selected ? selected.label : '';
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
      this.isOpen = false;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(event.target)) {
        this.isOpen = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-dropdown {
  position: relative;
  width: 50%;
  max-width: 520px;
}

.dropdown-toggle {
  width: 100%;
  height: 60px;
  padding: 0 50px 0 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: white;
  background: #696969;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  position: relative;
  display: flex;
  align-items: center;

  &:focus {
    outline: 2px solid #003595;
    outline-offset: 2px;
  }

  &:hover {
    background: #5a5a5a;
  }

  .placeholder {
    color: #999;
  }

  &.has-selection {
    color: white;
  }
}

.dropdown-arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.2s;
  color: white;

  &.is-open {
    transform: translateY(-50%) rotate(180deg);
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-option {
  width: 100%;
  padding: 15px 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  background: white;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f5f5;
  }

  &.is-selected {
    background: #e8f0ff;
    color: #003595;
    font-weight: 600;
  }

  &:focus {
    outline: none;
    background: #f5f5f5;
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>