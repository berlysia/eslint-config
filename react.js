module.exports = {
  extends: ["prettier"],
  env: { browser: true },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/boolean-prop-naming": [
      "error",
      { rule: "^(is|has)[A-Z]([A-Za-z0-9]?)+" },
    ],
    "react/button-has-type": "error",
    "react/default-props-match-prop-types": "off", // PropTypesはもう使わない
    "react/destructuring-assignment": "off", // 気にしない
    "react/display-name": "error",
    "react/forbid-component-props": "off",
    "react/forbid-dom-props": "off", // 厳しすぎる
    "react/forbid-elements": "off",
    "react/forbid-foreign-prop-types": "off",
    "react/forbid-prop-types": "off",
    "react/function-component-definition": "off", // どっちでもいい
    "react/jsx-boolean-value": "error",
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-handler-names": "off",
    "react/jsx-key": "error",
    "react/jsx-max-depth": "off",
    "react/jsx-no-bind": [
      "error",
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: true, // hooks
        allowFunctions: false,
        allowBind: false,
      },
    ],
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-literals": "off",
    "react/jsx-no-script-url": [
      "error",
      [
        {
          name: "Link",
          props: ["to"],
        },
      ],
    ],
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-sort-default-props": "off",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: false,
        shorthandFirst: false,
        shorthandLast: false,
        ignoreCase: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "error",
    "react/jsx-indent": "off",
    "react/no-access-state-in-setstate": "error",
    "react/no-adjacent-inline-elements": "error",
    "react/no-array-index-key": "off", // index以外を指定できることは少ない
    "react/no-children-prop": "error",
    "react/no-danger": "off", // 使うときはそもそも覚悟してる
    "react/no-danger-with-children": "error",
    "react/no-deprecated": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-find-dom-node": "error",
    "react/no-is-mounted": "error",
    "react/no-multi-comp": ["warn", { ignoreStateless: true }],
    "react/no-redundant-should-component-update": "error",
    "react/no-render-return-value": "error",
    "react/no-set-state": "off", // ストイックすぎる
    "react/no-string-refs": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": "error",
    "react/no-unsafe": "error",
    "react/no-unused-prop-types": "off",
    "react/no-unused-state": "error",
    "react/no-will-update-set-state": "error",
    "react/prefer-es6-class": ["error", "always"],
    "react/prefer-read-only-props": "error",
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off", // PropTypesに依存
    "react/require-optimization": "off",
    "react/require-render-return": "error",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: false,
      },
    ],
    "react/sort-comp": "off",
    "react/sort-prop-types": "off",
    "react/state-in-constructor": "off",
    "react/static-property-placement": "error",
    "react/style-prop-object": "error",
    "react/void-dom-elements-no-children": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-newline": "off",
    "react/jsx-no-constructed-context-values": "error",
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react/no-arrow-function-lifecycle": "error",
    "react/no-invalid-html-attribute": "error",
    "react/no-namespace": "error",
    "react/no-unused-class-component-methods": "off",
    "react/prefer-exact-props": "off",
    "react/hook-use-state": "error",
    "react/iframe-missing-sandbox": "error",
    "react/jsx-no-leaked-render": "off", // TS側でbooleanを強制する
  },
};
