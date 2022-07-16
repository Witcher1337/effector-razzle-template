module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier", "import", "unused-imports"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
        pathGroups: [
          {
            group: "internal",
            position: "after",
            pattern: "~/processes/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "~/pages/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "~/widgets/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "~/features/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "~/entities/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "~/shared/**",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      },
    ],
    "import/no-unresolved": "error",
  },
};
