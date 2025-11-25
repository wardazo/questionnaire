<template>
  <div class="page1-wrapper">
    <div class="page1-container">
      <!-- Left Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <div class="product-info">
            <h2 class="product-name">Vivity<sup>®</sup> and<br>PureSee<sup>*</sup></h2>
            <p class="product-subtitle">Vivity<sup>®</sup> / Vivity<sup>®</sup> Toric</p>
          </div>

          <div class="questionnaire-info">
            <p class="questionnaire-label">Questionnaires</p>
            <div class="questionnaire-count">05</div>
          </div>

          <div class="part-info">
            <p class="part-label">Part</p>
            <div class="part-number">{{ currentPart + 1 }}/{{ totalParts }}</div>
          </div>
        </div>

        <button class="btn-cancel" @click="cancelQuestionnaire">Cancel this questionnaire</button>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Part 1: Spectacle Independence -->
        <QuestionRadioTasks
          v-if="currentPart === 0"
          title="Spectacle independence:"
          question-text="On a typical day, how often do you wear glasses for the following tasks?"
          :tasks="part1Tasks"
          v-model="answers.part1"
        />

        <!-- Part 2: Overall Vision Experience -->
        <QuestionScale
          v-if="currentPart === 1"
          title="Overall Vision Experience:"
          :questions="part2Questions"
          :scale-min="0"
          :scale-max="10"
          scale-label="(0 = very dissatisfied, 10 = extremely satisfied)"
          v-model="answers.part2"
        />

        <!-- Part 3: Additional questions (can be another QuestionScale or QuestionRadioTasks) -->
        <QuestionScale
          v-if="currentPart === 2"
          title="Vision Quality:"
          :questions="part3Questions"
          :scale-min="0"
          :scale-max="10"
          scale-label="(0 = very poor, 10 = excellent)"
          v-model="answers.part3"
        />

        <!-- Part 4: Visual Acuity Measurements -->
        <QuestionVisualAcuity
          v-if="currentPart === 3"
          title="Visual Acuity Measurements"
          :measurements="part4Measurements"
          v-model="answers.part4"
        />

        <!-- Bottom Navigation -->
        <div class="bottom-nav">
          <button
            v-if="currentPart > 0"
            class="btn-back"
            @click="previousPart"
          >
            &lt;&lt; Back
          </button>
          <div v-else class="nav-spacer"></div>

          <div class="pagination-dots">
            <span
              v-for="index in totalParts"
              :key="index"
              :class="['dot', { active: currentPart === index - 1 }]"
            ></span>
          </div>

          <button
            v-if="currentPart < totalParts - 1"
            class="btn-next"
            @click="nextPart"
          >
            Next &gt;&gt;
          </button>
          <button
            v-else
            class="btn-finish"
            @click="finishQuestionnaire"
          >
            Finish
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import QuestionRadioTasks from './Subcomp/QuestionRadioTasks.vue';
import QuestionScale from './Subcomp/QuestionScale.vue';
import QuestionVisualAcuity from './Subcomp/QuestionVisualAcuity.vue';

export default {
  name: "Page1",
  components: {
    QuestionRadioTasks,
    QuestionScale,
    QuestionVisualAcuity
  },
  props: {
    page: {
      type: Object,
      default: () => ({ pg: 1, tab: 0 })
    }
  },
  data() {
    return {
      currentPart: this.page.tab || 0,
      totalParts: 4,
      answers: {
        part1: {},
        part2: {},
        part3: {},
        part4: {}
      },
      part1Tasks: [
        {
          key: 'farAway',
          label: 'Far away',
          description: '(e.g., watching TV, seeing street signs, recognizing faces).'
        },
        {
          key: 'armsLength',
          label: "Arm's length",
          description: '(e.g., seeing the prices of goods or the dashboard of a car).'
        },
        {
          key: 'upClose',
          label: 'Up close',
          description: '(e.g., reading a book or newspaper, or while eating).'
        }
      ],
      part2Questions: [
        {
          key: 'satisfaction',
          text: 'On a scale of 0 to 10, how satisfied are you with your vision after surgery?'
        }
      ],
      part3Questions: [
        {
          key: 'quality',
          text: 'On a scale of 0 to 10, how would you rate the overall quality of your vision?'
        }
      ],
      part4Measurements: [
        {
          key: 'unva',
          label: 'UNVA (40cm)',
          icon: require('@/assets/img/icon-phone.svg'),
          options: ['20/20', '20/25', '20/30', '20/40', '20/50', '20/60', '20/80', '20/100']
        },
        {
          key: 'uiva',
          label: 'UIVA (66cm)',
          icon: require('@/assets/img/icon-laptop.svg'),
          options: ['20/20', '20/25', '20/30', '20/40', '20/50', '20/60', '20/80', '20/100']
        },
        {
          key: 'udva',
          label: 'UDVA',
          icon: require('@/assets/img/icon-steering.svg'),
          options: ['20/20', '20/25', '20/30', '20/40', '20/50', '20/60', '20/80', '20/100']
        }
      ]
    };
  },
  watch: {
    'page.tab'(newTab) {
      this.currentPart = newTab;
    }
  },
  methods: {
    nextPart() {
      if (this.currentPart < this.totalParts - 1) {
        this.currentPart++;
        this.$emit('page-select', { pg: 1, tab: this.currentPart });
      }
    },
    previousPart() {
      if (this.currentPart > 0) {
        this.currentPart--;
        this.$emit('page-select', { pg: 1, tab: this.currentPart });
      }
    },
    finishQuestionnaire() {
      console.log('Questionnaire completed:', this.answers);
      // Navigate back to home or results page
      this.$emit('page-select', { pg: 0, tab: 0 });
    },
    cancelQuestionnaire() {
      // Navigate back to home
      this.$emit('page-select', { pg: 0, tab: 0 });
    }
  },
};
</script>

<style lang="scss" scoped>
.page1-wrapper {
  width: 100%;
  min-height: calc(100vh - 90px);
  background: white;
}

.page1-container {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 90px);
}

/* Sidebar */
.sidebar {
  width: 230px;
  background: #003595;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 30px;
  flex-shrink: 0;

  .sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .product-info {
    .product-name {
      font-family: 'Open Sans', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: white;
      line-height: 1.2;
      margin: 0 0 15px 0;

      sup {
        font-size: 16px;
      }
    }

    .product-subtitle {
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
      font-weight: 300;
      color: white;
      line-height: 1.3;
      margin: 0;

      sup {
        font-size: 10px;
      }
    }
  }

  .questionnaire-info,
  .part-info {
    .questionnaire-label,
    .part-label {
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: white;
      margin: 0 0 10px 0;
    }

    .questionnaire-count,
    .part-number {
      font-family: 'Open Sans', sans-serif;
      font-size: 48px;
      font-weight: 300;
      color: white;
      line-height: 1;
      margin: 0;
      border-bottom: 2px solid white;
      padding-bottom: 10px;
    }
  }

  .btn-cancel {
    width: 100%;
    background: white;
    border: none;
    border-radius: 5px;
    padding: 12px 15px;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 60px 80px;
}

/* Bottom Navigation */
.bottom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;

  .nav-spacer {
    width: 150px;
  }

  .pagination-dots {
    display: flex;
    gap: 15px;
    align-items: center;

    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #C4C4C4;
      transition: all 0.2s;

      &.active {
        background: #003595;
      }
    }
  }

  .btn-back,
  .btn-next,
  .btn-finish {
    background: #003595;
    border: none;
    border-radius: 8px;
    padding: 15px 50px;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 53, 149, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
