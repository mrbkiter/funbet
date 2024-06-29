import { put, call, takeLatest } from 'redux-saga/effects';
// import noti from 'utils/noti';
import { getAllMatchesSlice, getMatchesShortListSlice } from './reducer';
import { getAllMatches, getMatchesShortList } from './services';

export function* getMatchesShortListSaga(action) {
  try {
    const res = yield call(getMatchesShortList, action.payload);
    yield put(getMatchesShortListSlice.actions.getSuccess(res));
  } catch (e) {
    console.error('getMatchesShortListSaga:', e);
    yield put(getMatchesShortListSlice.actions.getFailure());
  }
}

export function* getAllMatchesSaga(action) {
  try {
    const res = yield call(getAllMatches, action.payload);
    yield put(getAllMatchesSlice.actions.getSuccess(res));
  } catch (e) {
    console.error('getAllMatchesSaga:', e);
    // noti.someThingWentWrong();
    yield put(getAllMatchesSlice.actions.getFailure());
  }
}

export default function* sagaMatches() {
  yield takeLatest(
    getMatchesShortListSlice.actions.getRequest.type,
    getMatchesShortListSaga,
  );
  yield takeLatest(
    getAllMatchesSlice.actions.getRequest.type,
    getAllMatchesSaga,
  );
}
