import { inject, Injectable } from '@angular/core';
import { CommonHttpService } from '../shardServices/common.service';
import { ILoginData } from '../../models/auth/ILoginData';
import { HttpPaths } from '../../constants/http-paths';
import { environment } from 'src/environments/environment';
import { ILoginResponseInterface } from '../../models/auth/ILoginResponseInterface';
import { catchError, map } from 'rxjs';
import { BasicsConstance } from '../../constants/basics-constance';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  CommonHttp = inject(CommonHttpService);
  router = inject(Router);
  constructor() {}

  isLoggedIn(): boolean {
    return localStorage.getItem(BasicsConstance.USER_TOKEN) ? true : false;
  }

  Login(LoginData: ILoginData) {
    return this.CommonHttp.CommonPostRequests(LoginData, `${environment.baseUrl + HttpPaths.API_LOGIN}`);
  }

  logout(userId: string) {
    if (!userId || userId === '') {
      return;
    }
    return this.CommonHttp.CommonPostRequests(null, `${environment.baseUrl + HttpPaths.API_LOGOUT}${userId}`).subscribe(
      {
        next: (res) => {
          localStorage.removeItem(BasicsConstance.USER_ID);
          localStorage.removeItem(BasicsConstance.USER_TOKEN);
          this.router.navigate(['/auth/login']);
        },
      },
    );
  }
}
