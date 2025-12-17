<template>
  <Modal v-if="show">
    <template v-slot:body>
      <div class="confirm-modal-content">
        <h2 class="confirm-modal-title">{{ title }}</h2>
        <p class="confirm-modal-message">{{ message }}</p>
        <div class="confirm-modal-buttons">
          <button class="btn-cancel" @click="cancel">
            {{ cancelText }}
          </button>
          <button class="btn-confirm" @click="confirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'ConfirmModal',
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Confirm'
    },
    message: {
      type: String,
      default: 'Are you sure?'
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="scss" scoped>
.confirm-modal-content {
  background: white;
  border-radius: 13px;
  padding: 40px;
  max-width: 500px;
  margin: 0 auto;
}

.confirm-modal-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px;
  font-family: 'Open Sans', sans-serif;
}

.confirm-modal-message {
  font-size: 18px;
  color: #1a1a1a;
  margin: 0 0 30px;
  font-family: 'Open Sans', sans-serif;
}

.confirm-modal-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.confirm-modal-buttons button {
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
  background: white;
  color: #1a1a1a;
  border: 2px solid #E8E8E8;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
  }
}

.btn-confirm {
  background: #003595;
  color: white;

  &:hover {
    background: #002570;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 53, 149, 0.3);
  }
}
</style>