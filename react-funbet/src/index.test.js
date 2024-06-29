import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client', () => {
  return {
    createRoot: jest.fn(() => {
      return {
        render: jest.fn(),
      };
    }),
  };
});

describe('Main Single Page App', () => {
  test('renders with App and root div', () => {
    const root = document.createElement('div');
    root.id = 'reactRoot';
    document.body.appendChild(root);

    // eslint-disable-next-line global-require
    require('./index.js');

    expect(createRoot).toHaveBeenCalledWith(root);
  });
});
