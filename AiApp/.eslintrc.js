// eslint-disable-next-line no-undef
module.exports = {
  env: { jest: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:promise/recommended",
    "plugin:react-native/all",
    "plugin:i18n-json/recommended",
    "plugin:import/typescript",
  ],
  globals: {
    Atomics: "readonly",
    JSX: true,
    SharedArrayBuffer: "readonly",
  },
  ignorePatterns: [
    "**/backend/src/types/types.validator.ts",
    "src/components/generated",
    "**/node_modules/*",
    "src/components/impComponents",
    "**/__mocks__/*",
    "./node_modules/",
  ],
  overrides: [
    {
      files: ["translation.json"],
      rules: {
        "prettier/prettier": "off",
      },
    },
    /*
      Added this "no-restricted-imports" warning rule as an override because it's not possible to add it to the rules below
      because the rule needs to be set as either an error OR a warning
    */
    {
      files: ["*.tsx"],
      // rules: {
      //   "no-restricted-imports": [
      //     "warn",
      //     {
      //       paths: [
      //         {
      //           importNames: ["Text"],
      //           message: "Import of Text from react-native is not allowed in this project.",
      //           name: "react-native",
      //         },
      //       ],
      //     },
      //   ],
      // },
    },
  ],
  parserOptions: {
    // Allows for the use of imports
    ecmaFeatures: {
      // Allows for the parsing of JSX
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 2021,
    project: "./tsconfig.json",
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
    tsconfigRootDir: "./",
  },

  // TODO once imp components are a package remove imp components folder and ignore here
  plugins: [
    "ban",
    "react",
    "react-native",
    "@typescript-eslint",
    "import",
    "prettier",
    "babel",
    "i18next",
    "standard",
    "react-hooks",
    "promise",
    "sort-keys-fix",
  ],
  root: true,
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
    "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/method-signature-style": "warn",
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-confusing-void-expression": "warn",
    "@typescript-eslint/no-duplicate-enum-values": "warn",
    "@typescript-eslint/no-dynamic-delete": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-invalid-void-type": "warn",
    "@typescript-eslint/no-loop-func": "warn",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-redundant-type-constituents": "warn",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-unused-vars": "off",
    // This is handled by TS
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/sort-type-union-intersection-members": "warn",
    // "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "ban/ban": ["error", { message: "merge is not type safe!!!  NO!", name: ["*", "merge"] }],
    "consistent-return": "error",
    "func-style": ["error", "expression"],
    "i18n-json/identical-keys": 0,
    "i18n-json/sorted-keys": [
      2,
      {
        indentSpaces: 2,
        order: "asc",
      },
    ],
    "i18n-json/valid-json": 2,
    "i18n-json/valid-message-syntax": [
      2,
      {
        syntax: "icu",
      },
    ],
    // Any string that is used in a JSX component outside of one of the following components will be flagged as a warning
    // This means we need to double check that the string is being translated
    // "i18next/no-literal-string": [
    //   "warn",
    //   {
    //     "jsx-components": {
    //       exclude: ["SuperText", "SimpleText", "SuperDate", "MoreLessText"],
    //       include: [],
    //     },
    //   },
    // ],
    "import/extensions": "off",
    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
    "no-loop-func": "off",
    "no-nested-ternary": "warn",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            importNames: ["Dimensions"],
            name: "react-native",
          },
          // {
          //   importNames: ["useSelector"],
          //   message: "Import of useSelector from react-redux is not allowed in this project.",
          //   name: "react-redux",
          // },
        ],
      },
    ],
    "no-shadow": "error",
    "no-underscore-dangle": "off",
    "no-void": "off",
    // "no-unused-expressions": ["error"],
    // camelcase: "off",
    "prefer-destructuring": [
      "error",
      {
        array: false,
        object: true,
      },
    ],
    "prettier/prettier": "error",
    "promise/always-return": "off",
    "promise/no-nesting": "error",
    // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-native/no-color-literals": "off",
    "react-native/no-inline-styles": "error",
    "react-native/no-raw-text": "off",

    "react-native/no-single-element-style-arrays": "error",
    // Checks effect dependencies
    "react-native/no-unused-styles": "error",
    "react-native/sort-styles": "off",
    "react-native/split-platform-components": "error",
    "react/destructuring-assignment": "error",
    "react/forbid-prop-types": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".tsx"] }],
    "react/jsx-no-bind": ["error"],
    "react/jsx-props-no-spreading": "off",
    "react/no-unescaped-entities": "error",
    "react/prop-types": "off",
    "react/proptypes": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    "sort-keys-fix/sort-keys-fix": ["error", "asc"],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
    node: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    react: {
      version: "detect",
    },
  },
};
