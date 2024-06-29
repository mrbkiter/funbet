import React from 'react';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import get from 'lodash/get';
import { rootSaga } from 'configs/rootSagas';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
export const renderComponentWithRedux = (Component, initialStates, props) => {
  const mockStore = configureMockStore([]);
  const store = mockStore({
    history: jest.fn(),
    authProvider: jest.fn(),
    dataProvider: jest.fn(),
    ...initialStates,
  });

  const InnerComponent = (innerProps) => (
    <Provider store={store}>
      <Component {...innerProps} />
    </Provider>
  );

  return mount(
    props ? (
      <InnerComponent {...props} />
    ) : (
      <Provider store={store}>{Component}</Provider>
    ),
  );
};

export const renderComponentWithReduxShallow = (Component, initialStates) => {
  const mockStore = configureMockStore([]);
  const store = mockStore({
    history: jest.fn(),
    authProvider: jest.fn(),
    dataProvider: jest.fn(),
    ...initialStates,
  });

  return shallow(<Provider store={store}>{Component}</Provider>);
};

export const runListActionTestForReducer = (
  listAction,
  initialState,
  reducer,
) => {
  listAction.forEach((action) => {
    const listPayloadKey = !action?.payloadKey
      ? ['payload']
      : action.payloadKey;

    const payloadData = listPayloadKey.reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        [currentValue]: get(action, currentValue),
      }),
      {},
    );

    const actionRequest = {
      ...payloadData,
      type: action.type,
    };
    if (action.uploadKey) {
      actionRequest.uploadKey = action.uploadKey;
    }

    return it(`should request with action ${action.type} correctly`, () => {
      expect(reducer(initialState, actionRequest)).toEqual(action.resultExpect);
    });
  });
};

export const renderHook = (CustomHook, ...args) => {
  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, CustomHook(...args));
    return null;
  }
  shallow(<TestComponent />);
  return returnVal;
};

export const renderHookWithRedux = (CustomHook, initialState, ...args) => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureMockStore([sagaMiddleware, thunk]);

  const store = mockStore({
    history: jest.fn(),
    authProvider: jest.fn(),
    dataProvider: jest.fn(),
    ...initialState,
  });

  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, CustomHook(...args));
    return null;
  }
  mount(
    <Provider store={store}>
      <TestComponent />
    </Provider>,
  );
  return [returnVal, store];
};

export const renderHookWithReduxAndRouter = (
  CustomHook,
  initialState,
  history = {},
  ...args
) => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureMockStore([sagaMiddleware]);

  const store = mockStore({
    history: jest.fn(),
    authProvider: jest.fn(),
    dataProvider: jest.fn(),
    ...initialState,
  });

  sagaMiddleware.run(rootSaga);

  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, CustomHook(...args));
    return null;
  }
  mount(
    <Router history={history}>
      <Provider store={store}>
        <TestComponent />
      </Provider>
    </Router>,
  );
  return [returnVal, store];
};
