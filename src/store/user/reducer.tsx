import { Reducer } from 'redux';
import { UserState, UserActionTypes } from './types';

// Type-safe initialState!
export const initialState: UserState = {
  data: {
    name: '',
    email: ''
  },
  errors: undefined,
  loading: false
};

const reducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.REGISTER_REQUEST: {
      return { ...state, loading: true }
    }
    case UserActionTypes.USER_CREATE_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case UserActionTypes.USER_CREATE_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
};

export { reducer as userReducer }
