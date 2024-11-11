import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/users/IUser';

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: IUser[] }>()
);
