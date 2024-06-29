import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from 'utils/helper';
import noti from 'utils/noti';
// import { getCandidateAvatar, updateAvatar } from '../services';

export const getAvatar = (entity, payload) => {
  return api
    .get({
      url: `/document/cropPhotoDialogJson.do?docType=${entity.toLowerCase()}_photo&entityId=${
        payload.id
      }`,
    })
    .then((response) => {
      return response.data || {};
    });
};

export const updateAvatar = (entity, payload) => {
  return api
    .post({
      url: `/document/base64/uploadDocument.do?docType=${entity.toLowerCase()}_photo`,
      data: {
        docId: payload.docId || '',
        originalFileName: payload.originalFileName,
        isTemp: 'false',
        contentType: 'image/png',
        candidateId: payload.id,
        fileBase64: payload.fileBase64,
      },
    })
    .then((response) => response.data);
};

export function* getEntityAvatarSaga(action) {
  const { entity } = action;
  try {
    const res = yield call(getAvatar, entity, action.payload);
    if (res.status === 'success') {
      yield put({
        type: `vincere/sc/${entity}/GET_AVATAR_SUCCESS`,
        payload: res.result,
      });
    } else {
      noti.someThingWentWrong();
      yield put({
        type: `vincere/sc/${entity}/GET_AVATAR_FAILURE`,
      });
    }
  } catch (e) {
    console.error(e);
    noti.someThingWentWrong();
    yield put({
      type: `vincere/sc/${entity}/GET_AVATAR_FAILURE`,
    });
  }
}

export function* updateEntityAvatar(action) {
  const { entity } = action;
  try {
    const res = yield call(updateAvatar, entity, {
      ...action.payload,
    });
    if (res.status === 'success') {
      noti.yourChangesHaveBeenSavedSuccessfully();
      yield put({
        type: `vincere/sc/${entity}/UPDATE_AVATAR_SUCCESS`,
        payload: res.result,
      });
    } else {
      noti.someThingWentWrong();
      yield put({
        type: `vincere/sc/${entity}/UPDATE_AVATAR_FAILURE`,
      });
    }
  } catch (e) {
    noti.someThingWentWrong();
    yield put({
      type: `vincere/sc/${entity}/UPDATE_AVATAR_FAILURE`,
    });
  }
}

export default function sagaEntityAvatar(entity) {
  return function* () {
    yield takeLatest(
      `vincere/sc/${entity}/GET_AVATAR_REQUEST`,
      getEntityAvatarSaga,
    );
    yield takeLatest(
      `vincere/sc/${entity}/UPDATE_AVATAR_REQUEST`,
      updateEntityAvatar,
    );
  };
}
