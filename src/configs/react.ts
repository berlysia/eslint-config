import { GLOB_JSX, GLOB_TSX } from "../globs";
import { pluginJsxA11y, pluginReact, pluginReactHooks } from "../plugins";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsReact(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:react",
      files: [GLOB_JSX, GLOB_TSX],
      plugins: {
        react: pluginReact,
        "react-hooks": pluginReactHooks,
        "jsx-a11y": pluginJsxA11y,
      },

      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
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
        "react/jsx-child-element-spacing": "off",
        "react/jsx-closing-bracket-location": "off",
        "react/jsx-closing-tag-location": "off",
        "react/jsx-curly-spacing": "off",
        "react/jsx-curly-newline": "off",
        "react/jsx-equals-spacing": "off",
        "react/jsx-first-prop-new-line": "off",
        "react/jsx-indent-props": "off",
        "react/jsx-max-props-per-line": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-props-no-multi-spaces": "off",
        "react/jsx-tag-spacing": "off",
        "react/jsx-wrap-multilines": "off",
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
        "react/no-unstable-nested-components": [
          "error",
          { allowAsProps: true },
        ],
        "react/no-arrow-function-lifecycle": "error",
        "react/no-invalid-html-attribute": "error",
        "react/no-namespace": "error",
        "react/no-unused-class-component-methods": "off",
        "react/prefer-exact-props": "off",
        "react/hook-use-state": "error",
        "react/iframe-missing-sandbox": "error",
        "react/jsx-no-leaked-render": "off", // TS側でbooleanを強制する
        "react/no-object-type-as-default-prop": "off",
        "react/sort-default-props": "off",

        "jsx-a11y/alt-text": "error",
        "jsx-a11y/anchor-ambiguous-text": "off",
        "jsx-a11y/anchor-has-content": "error",
        "jsx-a11y/anchor-is-valid": "error",
        "jsx-a11y/aria-activedescendant-has-tabindex": "error",
        "jsx-a11y/aria-props": "error",
        "jsx-a11y/aria-proptypes": "error",
        "jsx-a11y/aria-role": "error",
        "jsx-a11y/aria-unsupported-elements": "error",
        "jsx-a11y/autocomplete-valid": "error",
        "jsx-a11y/click-events-have-key-events": "error",
        "jsx-a11y/control-has-associated-label": "off",
        "jsx-a11y/heading-has-content": "error",
        "jsx-a11y/html-has-lang": "error",
        "jsx-a11y/iframe-has-title": "error",
        "jsx-a11y/img-redundant-alt": "error",
        "jsx-a11y/interactive-supports-focus": "error",
        "jsx-a11y/label-has-associated-control": "error",
        "jsx-a11y/lang": "off",
        "jsx-a11y/media-has-caption": "error",
        "jsx-a11y/mouse-events-have-key-events": "error",
        "jsx-a11y/no-access-key": "error",
        "jsx-a11y/no-aria-hidden-on-focusable": "off",
        "jsx-a11y/no-autofocus": "error",
        "jsx-a11y/no-distracting-elements": "error",
        "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
        "jsx-a11y/no-noninteractive-element-interactions": "error",
        "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
        "jsx-a11y/no-noninteractive-tabindex": "error",
        "jsx-a11y/no-onchange": "off",
        "jsx-a11y/no-redundant-roles": "error",
        "jsx-a11y/no-static-element-interactions": "error",
        "jsx-a11y/prefer-tag-over-role": "off",
        "jsx-a11y/role-has-required-aria-props": "error",
        "jsx-a11y/role-supports-aria-props": "error",
        "jsx-a11y/scope": "error",
        "jsx-a11y/tabindex-no-positive": "error",

        ...options.overrides,
      },
    },
  ];
}
