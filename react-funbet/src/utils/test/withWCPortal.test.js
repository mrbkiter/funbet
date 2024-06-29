import React from 'react';
import { render } from '@testing-library/react';
import withWCPortal from '../withWCPortal'; // Update the import path

const CORRECT_TAG_NAME = 'test-tag';
describe('withWCPortal', () => {
  it('renders the portal component when ref.current is available', () => {
    const TestComponent = () => <div>Test Component</div>;
    const PortalComponent = withWCPortal(TestComponent, {
      tagName: CORRECT_TAG_NAME,
      defaultProps: {},
    });

    const { container, getByText } = render(
      <>
        <test-tag>abc</test-tag>
        <PortalComponent />
      </>,
    );
    expect(getByText('Test Component')).toBeInTheDocument();
    const wcComponent = container.querySelector(CORRECT_TAG_NAME);

    // eslint-disable-next-line no-underscore-dangle
    wcComponent._ref.input.setProps({ onClose: () => {} });
    wcComponent.parentNode.remove();
    expect(container).toMatchSnapshot();
  });

  it('does not render the portal component when ref.current is not available', () => {
    const TestComponent = () => <div>Test Component</div>;
    const PortalComponent = withWCPortal(TestComponent, {
      tagName: CORRECT_TAG_NAME,
      defaultProps: {},
    });

    // Simulating ref.current not being available
    // document.querySelector = jest.fn(() => null);
    const { container, queryByText } = render(
      <>
        <test-tag1>abc</test-tag1>
        <PortalComponent />
      </>,
    );
    expect(queryByText('Test Component')).toBeNull();
    expect(container).toMatchSnapshot();
  });
});
