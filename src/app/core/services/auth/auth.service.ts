import { inject, Injectable } from '@angular/core';
import { CommonHttpService } from '../shardServices/common.service';
import { ILoginData } from '../../models/auth/ILoginData';
import { HttpPaths } from '../../constants/http-paths';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from '../../models/auth/ILoginResponse';
import { map, Observable } from 'rxjs';
import { BasicsConstance } from '../../constants/basics-constance';
import { Router } from '@angular/router';
import { IGeneralResponse } from '../../models/shard/IGeneralResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _commonHttp = inject(CommonHttpService);
  private _router = inject(Router);
  constructor() {}

  isLoggedIn(): boolean {
    return localStorage.getItem(BasicsConstance.USER_TOKEN) ? true : false;
  }

  Login(LoginData: ILoginData): Observable<ILoginResponse> {
    return this._commonHttp.CommonPostRequests(LoginData, `${environment.baseUrl + HttpPaths.API_LOGIN}`).pipe(
      map((res) => {
        if (res.isSuccess) {
          return res.data;
        }
      }),
    );
  }

  logout(userId: string) {
    if (!userId || userId === '') {
      return;
    }
    localStorage.removeItem(BasicsConstance.USER_ID);
    localStorage.removeItem(BasicsConstance.USER_TOKEN);
    this._router.navigate(['/auth/sing-out']);
  }
}
