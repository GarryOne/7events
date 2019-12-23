import { Reducer } from 'redux';
import { AuthState, AuthActionTypes } from './types';

// Type-safe initialState!
export const initialState: AuthState = {
  data: [],
  errors: undefined,
  loading: false
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_REQUEST: {
      return { ...state, loading: true }
    }
    case AuthActionTypes.AUTH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case AuthActionTypes.AUTH_GOOGLE: {
      return { ...state, loading: false, data: action.payload }
    }
    default: {
      return state
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as authReducer }
