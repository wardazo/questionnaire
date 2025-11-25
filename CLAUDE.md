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
- `src/components/Subcomp/`: Reusable question components for questionnaires
- `src/stores/`: Pinia stores (currently just `page.js` for navigation state)
- `src/modules/`: Utility modules for PDF generation and number formatting
- `src/locales/`: i18n JSON files (currently `en.json`)
- `src/scss/`: SCSS files including `nav.scss` for header/footer and `main.scss` as entry point
- `src/assets/img/`: Images and icons (including product icons for visual acuity measurements)
- `planning_materials/design/`: Design reference files (Figma exports)

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

**Page 2 - Results** (`page2.vue`)
- To be implemented
- Will display questionnaire results and analytics

### Color Palette
- **Primary Blue**: `#003595` (buttons, headers, selected states, sidebar)
- **Orange/Yellow**: `#ffac1c` (Results and PDF buttons)
- **Light Gray**: `#E8E8E8` (question backgrounds)
- **Border Gray**: `#D0D0D0` (input borders)
- **Text Dark**: `#1a1a1a` (primary text)
- **Header Gray**: `#f2f2f2` (header background)
- **White**: `#ffffff` (main background, cards)

### Design System
- **Typography**: Open Sans font family throughout
- **Border Radius**: 5-13px depending on element (buttons: 5-11px, cards: 8-13px)
- **Spacing**: Consistent use of 15px, 20px, 30px, 40px gaps
- **Transitions**: 0.2s for all hover/active states
- **Button Hover**: translateY(-2px) with box-shadow

## Notes

- The app integrates with Titanium (`Ti.App.fireEvent` in `App.vue`) suggesting it may be embedded in a native mobile wrapper
- Design files are available in `planning_materials/design/` for reference
- Icons required for visual acuity measurements: icon-phone.svg, icon-laptop.svg, icon-steering.svg