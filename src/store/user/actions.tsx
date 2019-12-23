import { action } from 'typesafe-actions';
import { UserActionTypes, User } from './types';

export const registerRequest = (data: User) => action(UserActionTypes.REGISTER_REQUEST, data);


// export const syncCollection = (data: any) => action(EventsActionTypes.SYNC_COLLECTION, data);
export const createUserSuccess = (data: User) => action(UserActionTypes.USER_CREATE_SUCCESS, data);
export const createUserError = (message: string) => action(UserActionTypes.USER_CREATE_ERROR, message);
