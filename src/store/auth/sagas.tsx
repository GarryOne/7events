import { all, call, fork, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { AuthActionTypes } from './types'
import { loginSuccess, loginFailure } from './actions'
import firebase from 'firebase';
import rsf from '../../firebase/firebase';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

function* loginSaga({ payload }: any) {
  try {
    const data = yield call(rsf.auth.signInWithEmailAndPassword, payload.email, payload.password);
    yield put(loginSuccess(data));
  }
  catch(error) {
    yield put(loginFailure(error));
  }
}

function* loginGoogleSaga() {
  try {
    const data = yield call(rsf.auth.signInWithPopup, googleAuthProvider);
    yield put(loginSuccess(data));
  }
  catch(error) {
    yield put(loginFailure(error));
  }
}

function* watchLoginSaga() {
  yield takeLatest(AuthActionTypes.AUTH_REQUEST, loginSaga);
}

function* watchGoogleLoginSaga() {
  yield takeLatest(AuthActionTypes.AUTH_GOOGLE, loginGoogleSaga);
}

function* authSaga() {
  yield all([fork(watchLoginSaga), fork(watchGoogleLoginSaga)])
}

export default authSaga
