
interface EventDateTime {
  dateTimeFrom: string;
  dateTimeTo: string;
}

export interface Event extends ApiResponse {
  id?: number
  name: string
  creator: string
  date: EventDateTime
  location: string
  eventType: string
  price?: string
  categories: string[]
  description: string
  people_attending?: number
  rating?: string
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum EventsActionTypes {
  FETCH_REQUEST = '@@events/FETCH_REQUEST',
  FETCH_SUCCESS = '@@events/FETCH_SUCCESS',
  SYNC_COLLECTION = '@@events/SYNC_COLLECTION',
  FETCH_ERROR = '@@events/FETCH_ERROR',
  ADD_EVENT = '@@events/ADD_EVENT',
  FETCH_EVENT = '@@events/FETCH_EVENT',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface EventsState {
  readonly loading: boolean
  readonly data: Event[]
  readonly errors?: string
}
