module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    snapshotSerializers: ["@emotion/jest/serializer"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  };
  