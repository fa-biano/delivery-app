module.exports = {
  "globals": {
    "__DATABASE__": true,
    "__COVERAGE__": true,
    "__REQUIREMENTS__": true,
    "__TESTID__": true,
    "__TESTDESC__": true,
    "__TESTFILE__": true
  },
  preset: "jest-puppeteer",
  rootDir: "./__tests__/end-to-end",
  testEnvironment: "../config/test_env.js",
  testSequencer: "../config/sequencer.js",
  setupFilesAfterEnv: [
    "../config/setupTest.js",
    "../config/matchers/other",
    "../config/matchers/mysql",
    "../config/matchers/puppeteer",
  ],
  testRegex: "./*\\.test\\.js$",
  testTimeout: 180000,
};
