import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducers';
import { rootSaga } from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
const storeMiddleware =
  process.env.MODE === 'localhost'
    ? composeWithDevTools(applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, storeMiddleware);
sagaMiddleware.run(rootSaga);

export { store };
