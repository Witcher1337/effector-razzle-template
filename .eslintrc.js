module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react"],
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
      },
    },
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "rules": {
    "indent": ["error", 2],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "consistent-return": "off",
    "newline-per-chained-call": ["error"],
    "object-curly-spacing": ["error", "never"],
    "react/jsx-max-props-per-line": [1, { "maximum": 1 }],
    "react/jsx-closing-bracket-location": ["error", "tag-aligned"],
    "react/jsx-wrap-multilines": [
      "error",
      {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "parens-new-line",
      },
    ],
    "react/jsx-first-prop-new-line": ["error"],
    //    "object-curly-newline": ["error", {
    //      "ObjectExpression": "always",
    //      "ObjectPattern": {
    //        "multiline": true
    //      },
    //      "ImportDeclaration": {
    //        "multiline": true
    //      },
    //      "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    //    }],
    "object-property-newline": ["error"],

    "comma-dangle": ["error", "always-multiline"],
  },
}
