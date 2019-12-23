export interface ICredential extends ApiResponse {
  email: string;
  password: string;
}

export type ApiResponse = Record<string, any>

export enum AuthActionTypes {
  AUTH_REQUEST = '@@auth/AUTH_REQUEST',
  AUTH_SUCCESS = '@@auth/AUTH_SUCCESS',
  AUTH_ERROR = '@@auth/AUTH_ERROR',
  AUTH_GOOGLE = '@@auth/AUTH_GOOGLE',
}

export interface AuthState {
  readonly loading: boolean
  readonly data: any
  readonly errors?: string
}
