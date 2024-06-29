/* eslint-disable import/export */
import {
  renderHook as TestRenderHook,
  queries,
  render,
  within,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { mockInitState } from '../mocks/mockData';
import * as customQueries from './custom-queries';
import { setupStore } from './store';

export * from '@testing-library/react';
export * from './custom-queries';
export { customScreen as screen, customWithin as within };

const allQueries = {
  ...queries,
  ...customQueries,
};

const customScreen = within(document.body, allQueries);
const customWithin = (element) => within(element, allQueries);

const createMockStore = (initialStates = {}) => {
  const state = {
    ...mockInitState,
    ...initialStates,
  };

  return setupStore({
    ...state,
  });
};

export const renderComponentWithRedux = (
  Component,
  { initialState, store = createMockStore(initialState), ...renderOptions },
) => {
  const Wrapper = (props) => {
    return <Provider store={store} {...props} />;
  };

  return render(Component, {
    wrapper: Wrapper,
    container: document.body,
    queries: allQueries,
    ...renderOptions,
  });
};

export const renderHookWithRedux = (hooks, options = {}) => {
  const { initialState = {} } = options;

  const store = createMockStore(initialState);
  const wrapper = (props) => {
    // debugger;
    return <Provider store={store} {...props} />;
  };
  return TestRenderHook(hooks, { wrapper });
};
