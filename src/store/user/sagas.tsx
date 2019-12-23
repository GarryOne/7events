import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { UserActionTypes } from './types';
import { createUserSuccess, createUserError } from './actions';
import rsf from '../../firebase/firebase';


function* registerUser(data: any): any {
  console.log(data);
  try {
    const user = yield call(rsf.auth.createUserWithEmailAndPassword, data.payload.email, data.payload.password);
    console.log(user);
    yield put(createUserSuccess(user));
  }
  catch(error) {
    yield put(createUserError(error));
  }
}

// function* watchSyncCollection() {
//   yield takeLatest(EventsActionTypes.FETCH_REQUEST, syncEventsCollection)
// }

function* watchUserRegisterEvent() {
  yield takeLatest(UserActionTypes.REGISTER_REQUEST, registerUser)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* userSaga() {
  yield all([fork(watchUserRegisterEvent)]);
}

export default userSaga
