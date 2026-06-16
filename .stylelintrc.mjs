export default {
  cache: true,
  ignoreFiles: ["src/styles/_fonts.scss"],
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
  ],
  plugins: [
    "stylelint-prettier",
    "stylelint-use-logical",
    "stylelint-plugin-defensive-css",
    "stylelint-high-performance-animation",
    "stylelint-no-unsupported-browser-features",
  ],
  rules: {
    "prettier/prettier": null,
    "scss/load-no-partial-leading-underscore": null,
    "custom-property-empty-line-before": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "media-feature-range-notation": null,
    "block-no-redundant-nested-style-rules": null,
    "number-max-precision": 5,
    "plugin/no-low-performance-animation-properties": null,
    "plugin/no-unsupported-browser-features": [
      true,
      {
        severity: "warning",
        browsers: ["Chrome > 120"],
        ignore: ["css-when-else", "css3-attr", "extended-system-fonts"],
        ignorePartialSupport: true,
      },
    ],
  },
};
