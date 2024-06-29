import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllGamblersSlice, getUserAccountSlice } from './reducer';
import { getAllGamblers, getUserAccount } from './services';

export function* getAllGamblersSaga(action) {
  try {
    const res = yield call(getAllGamblers, action.payload);
    yield put(getAllGamblersSlice.actions.getSuccess(res));
  } catch (e) {
    console.error('getAllGamblersSaga:', e);
    yield put(getAllGamblersSlice.actions.getFailure());
  }
}

export function* getAccountGamblerSaga(action) {
  try {
    const res = yield call(getUserAccount, action.payload);
    yield put(getUserAccountSlice.actions.getSuccess(res));
  } catch (e) {
    console.error('getAccountGamblersSaga:', e);
    yield put(getUserAccountSlice.actions.getFailure());
  }
}

export default function* sagaGamblers() {
  yield takeLatest(
    getAllGamblersSlice.actions.getRequest.type,
    getAllGamblersSaga,
  );
  yield takeLatest(
    getUserAccountSlice.actions.getRequest.type,
    getAccountGamblerSaga,
  );
}
