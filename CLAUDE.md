# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 questionnaire application built with Vue CLI. The application uses a page-based navigation system where pages are dynamically loaded based on store state.

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

- **State Management**: `src/stores/page.js` contains the page store with `pg` (page number) and `tab` (tab index) state
- **Dynamic Component Loading**: `App.vue` dynamically renders page components (`Page0`, `Page1`, `Page2`) based on the `pg` state
- **Page Components**: Located in `src/components/`, named `page0.vue`, `page1.vue`, `page2.vue`
- Pages emit `page-select` events to trigger navigation, handled by `handlePageChange()` in `App.vue`

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
- `src/components/`: Page components and `Subcomp/` subdirectory for reusable components
- `src/stores/`: Pinia stores (currently just `page.js`)
- `src/modules/`: Utility modules for PDF generation (`pdf.js`, `docraptor.js`) and number formatting (`rounding.js`)
- `src/locales/`: i18n JSON files (currently `en.json`)
- `src/scss/`: SCSS files (imports `nav.scss` and animate.css)
- `src/consts.js`: Application constants including `INITIAL_SCENARIO` and `INITIAL_DATA` with medical/surgical procedure cost data

### Important Patterns

**Constants File (`src/consts.js`)**: Contains domain-specific constants for a medical/surgical cost calculator, including:
- `NATIOANAL_AVERAGE` (note: intentional typo in variable name - do not change without updating all references)
- `INITIAL_SCENARIO` and `INITIAL_DATA` objects with nested structures for Hydrus procedure costs, cataract surgery metrics, and location-based fee data

**PDF Generation**: The `src/modules/pdf.js` exports an HTML template string for PDF rendering. The template includes inline styles optimized for A4 portrait printing and uses a `C_O_N_T_E_N_T` placeholder for dynamic content injection.

**Rounding Utilities**: `src/modules/rounding.js` exports composables `useRoundingFilter()` and `useRoundingPercentFilter()` for consistent number formatting with locale support.

**i18n Setup**: Locale messages are automatically loaded from `src/locales/*.json` files using `require.context()` in `src/i18n.js`. The messages are pre-compiled at build time by the Vue I18n loader plugin.

**CSS Framework**: Uses Bulma CSS with minimal customization. The previous `bulma-custom.scss` has been removed in favor of importing standard Bulma.

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

## Notes

- The application appears to be a medical/surgical cost calculator focused on Hydrus procedures and cataract surgeries
- Some page components (`page1.vue`, `page2.vue`) are currently minimal placeholders
- The app integrates with Titanium (`Ti.App.fireEvent` in `App.vue:82`) suggesting it may be embedded in a native mobile wrapper