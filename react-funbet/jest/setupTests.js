import Adapter from '@cfaester/enzyme-adapter-react-18';
import { configure } from 'enzyme';
import { server } from 'utils/test/mocks/msw-server';

import '@testing-library/jest-dom';
import 'jest-styled-components';

// Setup enzyme
configure({ adapter: new Adapter() });

// Establish API mocking before all tests.
beforeAll(() => server.listen({}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock fetch
global.fetch = require('jest-fetch-mock');

// Mock localStorage as it is a browser thing and not available in the test environment (vDOM)
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

global.console = {
  log: console.warn,
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  trace: jest.fn(),
};

class MockUppy {
  files = [];

  registerFunc = {};

  use() {}

  on(actionName, callback) {
    this.registerFunc[actionName] = callback;
  }

  setFileMeta() {}

  cancelAll() {}

  addFile(file) {
    if (this.registerFunc['file-added']) {
      this.registerFunc['file-added'](file);
    }
    return file.id;
  }

  setFileState() {}

  getFiles() {
    return [];
  }

  getFile() {}

  close() {}

  removeFile() {}

  log() {}
}

jest.mock('@uppy/react', () => ({
  DragDrop: () => null,
  useUppy: () => new MockUppy(),
}));

jest.mock('@uppy/core', () => MockUppy);
