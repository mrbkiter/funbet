import { put, call, takeLatest } from 'redux-saga/effects';
// import noti from 'utils/noti';
import { getAllTeamsSlice, getAllPredictsSlice } from './reducer';
import { getAllTeams, getForecastList } from './services';

export function* getAllTeamsSaga(action) {
  try {
    const res = yield call(getAllTeams, action.payload);
    yield put(getAllTeamsSlice.actions.getSuccess(res));
  } catch (e) {
    yield put(getAllTeamsSlice.actions.getFailure());
  }
}

export function* getAllPredictsSaga(action) {
  try {
    const res = yield call(getForecastList, action.payload);
    yield put(getAllPredictsSlice.actions.getSuccess(res));
  } catch (e) {
    yield put(getAllPredictsSlice.actions.getFailure());
  }
}

export default function* sagaPredicts() {
  yield takeLatest(getAllTeamsSlice.actions.getRequest.type, getAllTeamsSaga);
  yield takeLatest(
    getAllPredictsSlice.actions.getRequest.type,
    getAllPredictsSaga,
  );
}
