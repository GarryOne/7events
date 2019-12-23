import { action } from 'typesafe-actions';
import { AuthActionTypes } from './types';
import { User } from 'firebase';

export const authRequest = (data: any) => action(AuthActionTypes.AUTH_REQUEST, data);

export const googleAuthRequest = () => action(AuthActionTypes.AUTH_GOOGLE);

export const loginSuccess = (data: any) => action(AuthActionTypes.AUTH_SUCCESS, data);
export const loginFailure = (data: any) => action(AuthActionTypes.AUTH_ERROR, data);

