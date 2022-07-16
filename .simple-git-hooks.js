module.exports = {
  "commit-msg": "npx --no-install commitlint --edit $1",
  "pre-commit": "npm run lint",
}