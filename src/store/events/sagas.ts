import { all, call, fork, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import { EventsActionTypes } from './types'
import { syncCollection, getEvent } from './actions'
import rsf from '../../firebase/firebase';


function* syncEvents () {
  yield fork( rsf.firestore.syncCollection, 'events',
    {
      successActionCreator: (data: any )=> {
        const events = data.docs.map((document: any) => document.data());
        return syncCollection(events);
      },
    }
  );
}

function* createEvent(data: any): any {
  yield call(rsf.firestore.addDocument, 'events', data.payload);
}


// TODO: not working well
function* fetchEvent(data: any): any {
  const snapshot = yield call(rsf.firestore.getDocument, `events/${data.payload}`);
  const event = snapshot.data();
  console.log(event);
  yield put(getEvent(event));
}

function* watchSyncCollection() {
  yield takeEvery(EventsActionTypes.FETCH_REQUEST, syncEvents)
}

function* watchAddEvent() {
  yield takeLatest(EventsActionTypes.ADD_EVENT, createEvent)
}

// function* watchFetchEvent() {
//   yield takeLatest(EventsActionTypes.FETCH_EVENT, fetchEvent)
// }

// We can also use `fork()` here to split our saga into multiple watchers.
function*eventsSaga() {
  yield all([fork(watchSyncCollection), fork(watchAddEvent)]);
}

export default eventsSaga
