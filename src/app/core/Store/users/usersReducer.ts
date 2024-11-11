import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../models/users/IUser';
import * as UserActivation from './usersActions';

export interface UsersState {
  users: IUser[];
}
export const initialState: UsersState = {
  users: [],
};
export const usersReducer = createReducer(
  initialState,
  on(UserActivation.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
);
