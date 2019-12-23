export interface User extends ApiResponse {
  id?: number | string;
  name: string;
  email: string;
  location?: string;
  imageUrl?: string;
  interests?: string[];
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
export enum UserActionTypes {
  REGISTER_REQUEST = '@@events/REGISTER_REQUEST',
  USER_CREATE_SUCCESS = '@@events/USER_CREATE_SUCCESS',
  USER_CREATE_ERROR = '@@events/USER_CREATE_ERROR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface UserState {
  readonly loading: boolean
  readonly data: User
  readonly errors?: string
}
