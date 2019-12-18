import { Reducer } from 'redux';
import { EventsState, EventsActionTypes } from './types';

// Type-safe initialState!
export const initialState: EventsState = {
  data: [],
  errors: undefined,
  loading: false
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<EventsState> = (state = initialState, action) => {
  switch (action.type) {
    case EventsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case EventsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case EventsActionTypes.SYNC_COLLECTION: {
      return { ...state, loading: false, data: action.payload }
    }
    case EventsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case EventsActionTypes.ADD_EVENT: {
      return { ...state, loading: false, data: action.payload }
    }
    case EventsActionTypes.FETCH_EVENT: {
      return { ...state, loading: false, data: action.payload }
    }
    default: {
      return state
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as eventsReducer }
