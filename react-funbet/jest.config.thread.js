const helpers = require('./jest.config.js');

const THREAD = {
  FIRST: '1',
  SECOND: '2',
  THIRD: '3',
  FOURTH: '4',
};

let testMatch = [];

switch (process.env.thread) {
  case THREAD.FIRST:
    testMatch = [
      '<rootDir>/src/*.{spec,test}.{js,jsx,ts,tsx}',
      '<rootDir>/src/utils/**/*.{spec,test}.{js,jsx,ts,tsx}',
      '<rootDir>/src/sharedModules/**/*.{spec,test}.{js,jsx,ts,tsx}',
      '<rootDir>/src/pages/[A-B]*/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ];
    break;
  case THREAD.SECOND:
    testMatch = ['<rootDir>/src/pages/[C-D]*/**/*.{spec,test}.{js,jsx,ts,tsx}'];
    break;
  case THREAD.THIRD:
    testMatch = ['<rootDir>/src/pages/[E-J]*/**/*.{spec,test}.{js,jsx,ts,tsx}'];
    break;
  case THREAD.FOURTH:
    testMatch = ['<rootDir>/src/pages/[K-Z]*/**/*.{spec,test}.{js,jsx,ts,tsx}'];
    break;
  default:
    testMatch = helpers.testMatch;
    break;
}

module.exports = {
  ...helpers,
  coverageThreshold: undefined,
  testMatch,
};
