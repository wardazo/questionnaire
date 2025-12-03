# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 questionnaire application for Patient Outcomes PCIOLs (Premium Cataract Intraocular Lenses). The application uses a page-based navigation system where pages are dynamically loaded based on Pinia store state. It allows healthcare professionals to collect patient feedback through multi-part questionnaires about vision outcomes after PCIOL surgery.

## Development Commands

### Setup
```bash
npm install
```

### Development Server
```bash
npm run serve
```
Starts the development server with hot-reload at http://localhost:8080 (default)

### Production Build
```bash
npm run build
```
Compiles and minifies for production. Output goes to `dist/` directory.

### Linting
```bash
npm run lint
```
Runs ESLint to check and auto-fix code style issues.

### Internationalization
```bash
npm run i18n:report
```
Generates a report of missing/unused i18n keys across Vue and JS files.

## Architecture

### Page Navigation System
The application uses a centralized page navigation system managed by Pinia:

- **State Management**: `src/stores/page.js` contains the page store with `pg` (page number) and `tab` (tab/part index) state
- **Dynamic Component Loading**: `App.vue` dynamically renders page components (`Page0`, `Page1`, `Page2`) based on the `pg` state
- **Page Components**: Located in `src/components/`:
  - `page0.vue` - Home/landing page with product selection grid
  - `page1.vue` - Multi-part questionnaire with 4 parts
  - `page2.vue` - Results/summary page (to be implemented)
- Pages emit `page-select` events with `{ pg, tab }` to trigger navigation, handled by `handlePageChange()` in `App.vue`
- The `tab` parameter is used for multi-part pages (e.g., page1 has 4 parts)

### Technology Stack
- **Framework**: Vue 3 (Composition API and Options API mixed)
- **State Management**: Pinia
- **Styling**: Bulma CSS framework + custom SCSS (in `src/scss/`)
- **Validation**: Vuelidate (@vuelidate/core)
- **Internationalization**: Vue I18n with pre-compiled locale messages via `@intlify/vue-i18n-loader`
- **Charts**: Chart.js via vue-chartjs with chartjs-plugin-annotation
- **UI Components**:
  - FloatingVue for tooltips/popovers
  - @vuepic/vue-datepicker for date picking
  - vue-currency-input for currency inputs
  - Custom components in `src/components/Subcomp/`

### Key Directories
- `src/components/`: Page components (`page0.vue`, `page1.vue`, `page2.vue`)
- `src/components/Subcomp/`: Reusable question and chart components
- `src/stores/`: Pinia stores (`page.js`, `questionnaire.js`, `results.js`, `questionnaireConfigs.js`, `resultsConfig.js`)
- `src/services/`: API integration layer (`api.js` for backend communication)
- `src/modules/`: Utility modules for PDF generation and number formatting
- `src/locales/`: i18n JSON files (currently `en.json`)
- `src/scss/`: SCSS files including `nav.scss` for header/footer and `main.scss` as entry point
- `src/assets/img/`: Images and icons (including product icons for visual acuity measurements)
- `planning_materials/design/`: Design reference files (Figma exports)
- `backend/`: FastAPI backend with PostgreSQL database

### Important Patterns

#### Reusable Question Components
The questionnaire uses three main reusable question components in `src/components/Subcomp/`:

1. **`QuestionRadioTasks.vue`** - For questions with multiple tasks/scenarios, each with radio button options
   - Props: `title`, `questionText`, `tasks` (array of {key, label, description}), `options` (radio button options)
   - Uses `v-model` for two-way data binding
   - Example: "Spectacle independence" questions with Never/Occasionally/Often/Always options

2. **`QuestionScale.vue`** - For numeric scale questions (0-10)
   - Props: `title`, `questions` (array of {key, text}), `scaleMin`, `scaleMax`, `scaleLabel`
   - Renders numeric buttons that highlight when selected
   - Example: "How satisfied are you with your vision after surgery?"

3. **`QuestionVisualAcuity.vue`** - For visual acuity measurements with dropdown selects
   - Props: `title`, `measurements` (array of {key, label, icon, options})
   - Each measurement has an icon, label, and dropdown with options like "20/20", "20/25", etc.
   - Example: UNVA (40cm), UIVA (66cm), UDVA measurements with icons

All question components follow the same pattern:
- Accept configuration via props
- Emit updates via `v-model` (using `update:modelValue` event)
- Styled consistently with gray backgrounds and blue accent colors
- Self-contained with scoped SCSS

#### Multi-Part Questionnaires
`page1.vue` demonstrates the multi-part questionnaire pattern:
- Uses `currentPart` state to track which part (0-3) is active
- Conditionally renders different question components based on `currentPart`
- Bottom navigation shows Back/Next/Finish buttons and pagination dots
- Part number displayed in left sidebar updates dynamically
- Answers stored in `answers.part1`, `answers.part2`, etc.

#### Page0 Layout Pattern
`page0.vue` uses CSS Grid for responsive layout:
- 4-column grid for product cards (`grid-template-columns: 1fr 1fr 1fr 1fr`)
- First column is sidebar with title and nav links
- Columns 2-4 contain product cards with dual sections
- Bottom section spans full width with legal text (cols 1-3) and PDF button (col 4)
- Consistent 15px gap throughout grid
- Orange "Results" buttons navigate to Page2 with comparison set parameter

#### Page2 Results Pattern
`page2.vue` implements data visualization for questionnaire results:
- **Layout**: Sidebar (230px, blue `#003595`) + main content area (flex: 1)
- **Sidebar Contents**: Product info, counts, action buttons
- **Chart Display**: Uses Chart.js via `vue-chartjs` for grouped bar charts
- **Tab Navigation**: Config-driven tabs from `resultsConfig.js`
- **Data Flow**:
  1. Page0 sets `comparisonSet` in page store (e.g., 'vivity-puresee')
  2. Page2 fetches aggregated data via `resultsStore.fetchResults()`
  3. Backend returns grouped answer counts per question
  4. `ResultsChart.vue` transforms data into Chart.js format
  5. Charts render with color-coded answer options
- **Chart Colors**: Configured in `resultsConfig.js` - Never=blue, Occasionally=tan, Often=orange, Always=green
- **Reusability**: `ResultsChart.vue` component handles any question set with dynamic labels and colors

**PDF Generation**: The `src/modules/pdf.js` exports an HTML template string for PDF rendering. The template includes inline styles optimized for A4 portrait printing and uses a `C_O_N_T_E_N_T` placeholder for dynamic content injection.

**i18n Setup**: Locale messages are automatically loaded from `src/locales/*.json` files using `require.context()` in `src/i18n.js`. The messages are pre-compiled at build time by the Vue I18n loader plugin.

### Configuration

**Vue Config (`vue.config.js`)**:
- `publicPath: ""` - Uses relative paths for assets (important for embedded/non-root deployments)
- i18n plugin configured with `compositionOnly: true` and `fullInstall: true`

**ESLint (`eslintrc.js`)**:
- Extends `plugin:vue/vue3-essential`
- `vue/multi-word-component-names` is disabled
- `no-unused-vars` is disabled
- Console/debugger warnings only in production

**Environment Variables**:
- `VUE_APP_I18N_LOCALE=en`
- `VUE_APP_I18N_FALLBACK_LOCALE=en`

## Application Structure

### Pages

**Page 0 - Home/Product Selection** (`page0.vue`)
- Displays 3 product columns with dual product cards:
  - Column 1: Vivity® & PureSee*
  - Column 2: PanOptix® & Odyssey*
  - Column 3: PanOptix® & Galaxy*
- Each product shows questionnaire count and "Start new" button
- Results buttons for each product pair
- Legal footer and "Send Summary" PDF button

**Page 1 - Questionnaire** (`page1.vue`)
- Multi-part questionnaire with 4 parts:
  - Part 1: Spectacle independence (radio tasks)
  - Part 2: Overall Vision Experience (0-10 scale)
  - Part 3: Vision Quality (0-10 scale)
  - Part 4: Visual Acuity Measurements (UNVA, UIVA, UDVA dropdowns)
- Left sidebar shows product info, questionnaire count, and current part
- Bottom navigation with Back/Next/Finish and pagination dots
- "Cancel this questionnaire" button returns to home

**Page 2 - Results/Analytics** (`page2.vue`)
- Side-by-side comparison of two products from the same questionnaire set
- Three comparison sets navigated via Results buttons on Page0:
  - SET1: Vivity® vs PureSee* (4 tabs)
  - SET2: PanOptix® vs Odyssey* (5 tabs)
  - SET3: PanOptix® vs Galaxy* (5 tabs)
- Left sidebar displays:
  - "Results" title
  - Both product names with subtitles
  - Questionnaire completion counts for each product
  - "Send this PDF report" button (future implementation)
  - "Exit this summary" button (returns to Page0)
- Main content area with tab-based navigation:
  - Tab 0: Spectacle independence (bar charts)
  - Tab 1: Visual disturbances - halos
  - Tab 2: Visual disturbances - glare
  - Tab 3: Visual acuity & patient satisfaction (or overall satisfaction for SET2/SET3)
  - Tab 4: Visual acuity measurements (SET2/SET3 only)
- Uses `ResultsChart.vue` component for rendering side-by-side bar charts
- State management via `results.js` store (fetches aggregated data from backend)
- Configuration driven by `resultsConfig.js` (tab sections, chart colors, question mappings)
- Displays loading, error, and empty states gracefully

### Color Palette
- **Primary Blue**: `#003595` (buttons, headers, selected states, sidebar, "Never" in charts)
- **Orange/Yellow**: `#ffac1c` (Results and PDF buttons, "Often" in charts)
- **Tan/Beige**: `#D2B48C` ("Occasionally" in charts)
- **Green**: `#4CAF50` ("Always" in charts)
- **Light Gray**: `#E8E8E8` (question backgrounds, chart container backgrounds)
- **Border Gray**: `#D0D0D0` (input borders, dividers)
- **Text Dark**: `#1a1a1a` (primary text)
- **Header Gray**: `#f2f2f2` (header background)
- **White**: `#ffffff` (main background, cards, chart canvas backgrounds)

### Design System
- **Typography**: Open Sans font family throughout
- **Border Radius**: 5-13px depending on element (buttons: 5-11px, cards: 8-13px)
- **Spacing**: Consistent use of 15px, 20px, 30px, 40px gaps
- **Transitions**: 0.2s for all hover/active states
- **Button Hover**: translateY(-2px) with box-shadow

## Backend API

The FastAPI backend (`backend/`) provides REST endpoints for questionnaire data management.

### Starting the Backend
```bash
cd backend
uvicorn main:app --reload
```
Backend runs at http://localhost:8000 by default.

### API Endpoints

**1. GET `/api/questionnaires/counts`**
- Returns completion counts for all 6 questionnaire types
- Response: `{ vivity: 5, puresee: 3, panoptix1: 0, odyssey: 0, panoptix2: 2, galaxy: 1 }`
- Used by Page0 to display counts on product cards

**2. POST `/api/questionnaires/submit`**
- Submits a completed questionnaire with answers
- Request body:
  ```json
  {
    "questionnaireType": "vivity",
    "startedAt": "2025-12-02T10:00:00Z",
    "completedAt": "2025-12-02T10:15:00Z",
    "randomNumber": 123456,
    "answers": [
      { "questionId": "SET1_SPECTACLE_FAR", "value": "never" },
      { "questionId": "SET1_SPECTACLE_ARMS", "value": "occasionally" }
    ]
  }
  ```
- Response: Submission record with ID and answer count
- Status: 201 on success, 400 on validation error, 500 on DB error

**3. GET `/api/questionnaires/results/{comparison_set}`**
- Returns aggregated results for a comparison set
- Path parameter: `comparison_set` - One of 'vivity-puresee', 'panoptix-odyssey', 'panoptix-galaxy'
- Response:
  ```json
  {
    "comparisonSet": "vivity-puresee",
    "products": {
      "product1": {
        "type": "vivity",
        "displayName": "Vivity®",
        "count": 5,
        "aggregatedData": {
          "SET1_SPECTACLE_FAR": {
            "never": 8,
            "occasionally": 5,
            "often": 2,
            "always": 1
          }
        }
      },
      "product2": { /* same structure */ }
    }
  }
  ```
- Backend performs SQL aggregation: `GROUP BY (question_id, answer_value) COUNT(*)`
- Used by Page2 to render comparison charts

### Database Schema

**QuestionnaireSubmission Table**
- `id`: int (PK)
- `questionnaire_type`: str (indexed) - One of 6 valid types
- `started_at`: datetime (indexed)
- `completed_at`: datetime (indexed)
- `random_number`: int - 6-digit identifier
- `created_at`: datetime

**QuestionnaireAnswer Table**
- `id`: int (PK)
- `submission_id`: int (FK to QuestionnaireSubmission, indexed)
- `question_id`: str (indexed) - e.g., "SET1_SPECTACLE_FAR"
- `answer_value`: str - Raw answer value
- `created_at`: datetime

### Question ID Format
Question IDs follow the pattern: `SET{1-3}_{CATEGORY}_{SPECIFIC}`
- **SET1** (Vivity/PureSee): SET1_SPECTACLE_FAR, SET1_HALOS_FREQ, SET1_SATISFACTION, etc.
- **SET2** (PanOptix/Odyssey): SET2_SPECTACLE_FAR, SET2_CLARITY_BRIGHT, SET2_SATISFACTION, etc.
- **SET3** (PanOptix/Galaxy): SET3_CLARITY_BRIGHT, SET3_SHADOW_GHOST, SET2_SATISFACTION, etc.

All question IDs are defined in `src/stores/questionnaireConfigs.js`.

## Extending Page2

### Adding New Chart Sections
Page2 is designed to be easily extensible. Currently, only Tab 0 (Spectacle independence) is fully implemented. To add new tabs:

1. **Update Tab Configuration** in `src/stores/resultsConfig.js`:
   ```javascript
   {
     id: 1,
     label: 'Visual disturbances halos',
     title: 'Visual disturbances:',
     subtitle: 'Halos in dim light',
     questionIds: ['SET1_HALOS_FREQ', 'SET1_HALOS_BOTHER'],
     taskLabels: ['Frequency', 'Bothersome level'],
     optionType: 'MIXED'
   }
   ```

2. **Chart Component Automatically Handles**:
   - Data transformation from backend aggregation
   - Color mapping based on answer values
   - Legend generation
   - Responsive sizing

3. **No Code Changes Needed** - the tab navigation and chart rendering are fully config-driven.

### Custom Chart Types
For chart types beyond grouped bar charts:
1. Create new component in `src/components/Subcomp/` (e.g., `ResultsPieChart.vue`)
2. Import Chart.js chart type (Pie, Line, etc.)
3. Update Page2 to conditionally render based on `optionType` in config

### Color Scheme Consistency
All chart colors are defined in `CHART_COLORS` in `resultsConfig.js`:
- Radio options: blue, tan, orange, green
- Bothersome options: green to red gradient
- Clarity options: green (clear) to red (blurry)
- Scale options (0-10): red to green gradient
- Visual acuity: green (20/20) to red (20/100)

## Notes

- The app integrates with Titanium (`Ti.App.fireEvent` in `App.vue`) suggesting it may be embedded in a native mobile wrapper
- Design files are available in `planning_materials/design/` for reference
- Icons required for visual acuity measurements: icon-phone.svg, icon-laptop.svg, icon-steering.svg
- Chart.js v4.4.6 and vue-chartjs v5.3.2 are used for data visualization
- Backend aggregation is preferred over frontend processing for better performance