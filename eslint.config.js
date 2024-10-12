import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import typescriptEslintParser from '@typescript-eslint/parser';
import vueEslintParser from 'vue-eslint-parser';

export default [
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ["**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: [".vue"],
      },
      globals: {
        node: true,
        browser: true,
        es2021: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "vue": vuePlugin,
    },
    rules: {
      // Vue specific rules
      "vue/attribute-hyphenation": [
        "error",
        "never",
        {
          ignore: [],
        },
      ],
      "vue/v-on-event-hyphenation": [
        "error",
        "never",
        {
          autofix: false,
          ignore: [],
        },
      ],
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["Center", "Modal", "Builds", "Index"],
        },
      ],

      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-empty-interface": ["off"],
      "@typescript-eslint/no-non-null-assertion": ["off"],
      "@typescript-eslint/explicit-module-boundary-types": ["off"],

      // Custom rules
      "no-console": "warn",
      "no-debugger": "error",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
        },
      },
    },
  },
];