module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-case': [2, 'always', ['pascal-case', 'lower-case']],
    'scope-enum': [2, 'always', []],
  },
};
