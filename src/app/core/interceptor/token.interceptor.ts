import { HttpInterceptorFn } from '@angular/common/http';
import { BasicsConstance } from '../constants/basics-constance';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(BasicsConstance.USER_TOKEN); // Use getCookie directly
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};
