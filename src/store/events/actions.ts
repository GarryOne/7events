import { action } from 'typesafe-actions';
import { EventsActionTypes, Event } from './types';

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(EventsActionTypes.FETCH_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const syncCollection = (data: any) => action(EventsActionTypes.SYNC_COLLECTION, data);
export const fetchSuccess = (data: Event[]) => action(EventsActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(EventsActionTypes.FETCH_ERROR, message);
export const addEvent = (data: Event) => action(EventsActionTypes.ADD_EVENT, data);
export const getEvent = (data: any) => action(EventsActionTypes.FETCH_EVENT, data);
