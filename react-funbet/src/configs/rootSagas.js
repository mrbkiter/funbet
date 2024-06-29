import { fork, all } from 'redux-saga/effects';
import sagaMatches from 'pages/Matches/saga';
import sagaGamblers from 'pages/Gamblers/saga';
import sagaPredicts from 'pages/Predict/saga';

export function* rootSaga() {
  yield all([fork(sagaMatches), fork(sagaGamblers), fork(sagaPredicts)]);
}
