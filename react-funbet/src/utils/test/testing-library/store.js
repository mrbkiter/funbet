import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from 'configs/micro/rootMicroReducers';
import { rootSaga } from 'configs/micro/rootMicroSagas';

export const setupStore = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({}).concat([sagaMiddleware]);
    },
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
