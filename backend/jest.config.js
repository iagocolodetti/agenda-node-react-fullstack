// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  setupFiles: [
    "<rootDir>/tests/dotenv.config.js"
  ],
  testEnvironment: "node"
};
