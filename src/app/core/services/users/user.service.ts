import { inject, Injectable } from '@angular/core';
import { CommonHttpService } from '../shardServices/common.service';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { IUserSearch } from '../../models/users/IUserSearch';
import { environment } from 'src/environments/environment';
import { HttpPaths } from '../../constants/http-paths';
import { Store } from '@ngrx/store';
import { UsersState } from '../../Store/users/usersReducer';
import { loadUsersSuccess } from '../../Store/users/usersActions';
import { IUser } from '../../models/users/IUser';
import { ToasterService } from '../uiServices/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _commonHttp = inject(CommonHttpService);
  private _toast = inject(ToasterService);
  private store = inject(Store<{ users: UsersState }>);
  constructor() {}

  getAllUsers(model: IUserSearch) {
    return this._commonHttp
      .CommonGetRequestsWithQuery(`${environment.baseUrl + HttpPaths.API_GET_ALL_USER}`, model)
      .pipe(
        map((res) => {
          if (res.isSuccess) {
            return res.data;
          }
        }),
        catchError((err) => {
          this._toast.error('Error' + err);
          return of([]);
        }),
      )
      .subscribe((res) => this.store.dispatch(loadUsersSuccess({ users: res })));
  }

  upsertUser(model: IUser) {
    return this._commonHttp.CommonPostRequests(model, `${environment.baseUrl + HttpPaths.API_UPSERT_USER}`).pipe(
      map((res) => {
        if (res.isSuccess) {
          this.getAllUsers({});
        }
      })
    )
  }

  toggleUser(id: string) {
    return this._commonHttp.CommonPutRequests({}, `${environment.baseUrl + HttpPaths.API_TOGGLE_USER + id}`).pipe(
      map((res) => {
        if (res.isSuccess) {
          this.getAllUsers({});
        }
      }),
    );
  }

  deleteUser(id: string) {
    return this._commonHttp.CommonDeleteRequest(`${environment.baseUrl + HttpPaths.API_DELETE_USER + id}`).pipe(
      map((res) => {
        if (res.isSuccess) {
          this.getAllUsers({});
        }
      }),
    );
  }
}
