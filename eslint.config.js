import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // Node/CommonJS scripts and configs — not browser code, so `process`,
    // `require`, `module`, `exports`, `Buffer` etc. are real globals here,
    // not undefined references.
    files: [
      'api/**/*.js',
      'functions/**/*.js',
      'dico/**/*.js',
      'extract_pdfs.js',
      'playwright.config.js',
      'mobile/babel.config.js',
      'mobile/metro.config.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // React Native source — bundled via Metro (CommonJS `require`), so it
    // needs Node globals alongside the browser-ish ones RN also exposes.
    files: ['mobile/src/**/*.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    // Service worker scope — `self`/`clients`/`registration` aren't
    // browser-window globals.
    files: ['public/sw-notifications.js'],
    languageOptions: {
      globals: globals.serviceworker,
    },
  },
])
