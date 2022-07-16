module.exports = {
  "*.{js,jsx,ts,tsx}": "eslint --cache --fix",
  "*.css": "stylelint --fix",
  "*.scss": "stylelint --fix --custom-syntax postcss-scss",
};
