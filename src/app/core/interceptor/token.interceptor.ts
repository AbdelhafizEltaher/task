import { HttpInterceptorFn } from '@angular/common/http';
import { BasicsConstance } from '../constants/basics-constance';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const translate = inject(TranslateService)   
  const token = localStorage.getItem(BasicsConstance.USER_TOKEN); // Use getCookie directly
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'accept-language': translate.currentLang === 'en' ? 'en-US' :'e.g',
    },
  });
  return next(authReq);
};
