import vuePlugin from "eslint-plugin-vue";
import vueTsConfig from "@vue/eslint-config-typescript"

export default [
  ...vuePlugin.configs["flat/recommended"],
  ...vueTsConfig(),
  {
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
      "@typescript-eslint/no-empty-object-type": ["error", {
        allowObjectTypes: "always"
      }],
      "@typescript-eslint/no-empty-object-type": ["off"],

      // Custom rules
      "no-console": "warn",
      "no-debugger": "error",
    },
  },
];
