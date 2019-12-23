import { all, call, fork, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import { EventsActionTypes } from './types'
import { syncCollection, getEvent } from './actions'
import rsf from '../../firebase/firebase';


function* syncEventsCollection () {
  yield fork( rsf.firestore.syncCollection, 'events',
    {
      successActionCreator: (data: any )=> {
        const events = data.docs.map((document: any) => {
          return {
            ...document.data(),
            id: document.id,
          }
        });
        return syncCollection(events);
      },
    }
  );
}

function* createEvent(data: any): any {
  yield call(rsf.firestore.addDocument, 'events', { ...data.payload,  });
}

function* watchSyncCollection() {
  yield takeLatest(EventsActionTypes.FETCH_REQUEST, syncEventsCollection)
}

function* watchAddEvent() {
  yield takeLatest(EventsActionTypes.ADD_EVENT, createEvent)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function*eventsSaga() {
  yield all([fork(watchSyncCollection), fork(watchAddEvent)]);
}

export default eventsSaga
