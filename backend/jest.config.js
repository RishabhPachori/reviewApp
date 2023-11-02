// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [
        "./modules/**/*.js"
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        "./modules"
    ],


    // The test environment that will be used for testing
    testEnvironment: "node",


    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ]
};
