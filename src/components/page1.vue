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
            <div class="part-number">1/4</div>
          </div>
        </div>

        <button class="btn-cancel">Cancel this questionnaire</button>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <div class="question-section">
          <h1 class="section-title">Spectacle independence:</h1>
          <p class="question-text">On a typical day, how often do you wear glasses for the following tasks?</p>

          <!-- Far away -->
          <div class="task-group">
            <div class="task-header">
              <span class="bullet">•</span>
              <div class="task-text">
                <strong>Far away</strong>
                <span class="task-examples">(e.g., watching TV, seeing street signs, recognizing faces).</span>
              </div>
            </div>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="far-away" value="never" v-model="answers.farAway">
                <span>Never</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="far-away" value="occasionally" v-model="answers.farAway">
                <span>Occasionally</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="far-away" value="often" v-model="answers.farAway">
                <span>Often</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="far-away" value="always" v-model="answers.farAway">
                <span>Always</span>
              </label>
            </div>
          </div>

          <!-- Arm's length -->
          <div class="task-group">
            <div class="task-header">
              <span class="bullet">•</span>
              <div class="task-text">
                <strong>Arm's length</strong>
                <span class="task-examples">(e.g., seeing the prices of goods or the dashboard of a car).</span>
              </div>
            </div>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="arms-length" value="never" v-model="answers.armsLength">
                <span>Never</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="arms-length" value="occasionally" v-model="answers.armsLength">
                <span>Occasionally</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="arms-length" value="often" v-model="answers.armsLength">
                <span>Often</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="arms-length" value="always" v-model="answers.armsLength">
                <span>Always</span>
              </label>
            </div>
          </div>

          <!-- Up close -->
          <div class="task-group">
            <div class="task-header">
              <span class="bullet">•</span>
              <div class="task-text">
                <strong>Up close</strong>
                <span class="task-examples">(e.g., reading a book or newspaper, or while eating).</span>
              </div>
            </div>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="up-close" value="never" v-model="answers.upClose">
                <span>Never</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="up-close" value="occasionally" v-model="answers.upClose">
                <span>Occasionally</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="up-close" value="often" v-model="answers.upClose">
                <span>Often</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="up-close" value="always" v-model="answers.upClose">
                <span>Always</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Bottom Navigation -->
        <div class="bottom-nav">
          <div class="pagination-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <button class="btn-next" @click="nextPage">Next &gt;&gt;</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page1",
  data() {
    return {
      answers: {
        farAway: null,
        armsLength: null,
        upClose: null
      }
    };
  },
  methods: {
    nextPage() {
      console.log('Answers:', this.answers);
      // Navigate to next page/part
      this.$emit('page-select', { pg: 1, tab: 1 });
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

.question-section {
  flex: 1;

  .section-title {
    font-family: 'Open Sans', sans-serif;
    font-size: 36px;
    font-weight: 300;
    color: #1a1a1a;
    margin: 0 0 20px 0;
  }

  .question-text {
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 50px 0;
  }
}

.task-group {
  background: #E8E8E8;
  border-radius: 8px;
  padding: 30px 40px;
  margin-bottom: 30px;

  .task-header {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;

    .bullet {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.2;
    }

    .task-text {
      flex: 1;
      font-family: 'Open Sans', sans-serif;
      font-size: 18px;
      color: #1a1a1a;
      line-height: 1.4;

      strong {
        font-weight: 700;
        display: block;
        margin-bottom: 5px;
      }

      .task-examples {
        font-weight: 400;
        display: block;
      }
    }
  }

  .radio-group {
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    padding-left: 39px;

    .radio-option {
      background: white;
      border: 2px solid #D0D0D0;
      border-radius: 50px;
      padding: 12px 30px;
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: #1a1a1a;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 0;
      position: relative;

      input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }

      span {
        user-select: none;
      }

      &:hover {
        border-color: #003595;
      }

      input[type="radio"]:checked + span {
        font-weight: 700;
      }

      &:has(input[type="radio"]:checked) {
        background: #003595;
        border-color: #003595;
        color: white;
      }
    }
  }
}

/* Bottom Navigation */
.bottom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;

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

  .btn-next {
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
