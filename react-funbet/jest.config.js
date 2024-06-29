module.exports = {
  rootDir: './',
  roots: ['<rootDir>/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'html', 'cobertura'],
  moduleFileExtensions: ['js', 'jsx'],
  modulePaths: ['src'],
  setupFilesAfterEnv: ['./jest/setupTests.js'],
  testEnvironment: 'jsdom',
  testResultsProcessor: 'jest-sonar-reporter',
  globalSetup: '<rootDir>/global-setup.js',
  unmockedModulePathPatterns: [
    '<rootDir>/node_modules/react',
    '<rootDir>/node_modules/react-dom',
    '<rootDir>/node_modules/react-addons-test-utils',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/components'],
  coverageThreshold: {
    global: {
      statements: 25,
      branches: 25,
      functions: 25,
      lines: 25,
    },
  },
  testMatch: [
    '<rootDir>/src/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/pages/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/utils/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/sharedModules/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>[/\\\\](build|docs|node_modules|public|src/components)[/\\\\]',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/node_modules/identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileAssest.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
