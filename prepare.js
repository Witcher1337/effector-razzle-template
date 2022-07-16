const { execSync } = require("child_process");

console.info("Initialize simple-git-hooks");
execSync("npx simple-git-hooks", {
  stdio: [0, 1, 2],
});
