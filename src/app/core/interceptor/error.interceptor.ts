/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from '../services/uiServices/toaster.service';
import { BasicsConstance } from '../constants/basics-constance';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToasterService);
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        localStorage.removeItem(BasicsConstance.USER_ID);
        localStorage.removeItem(BasicsConstance.USER_TOKEN);
        toast.error("Unauthorized");
      }
      if (error instanceof HttpErrorResponse && error.status === 400) {
        toast.error("Bad Request");
      }
      if (error instanceof HttpErrorResponse && error.status === 403) {
        toast.error("Forbidden");
      }

      if (error.error && isPlatformBrowser(PLATFORM_ID)) {
        if (error.error.errors) {
          const errorMessages = Object.values(error.error.errors).flat();
          errorMessages.forEach((errorMessage: any) => {
            toast.error(errorMessage);
          });
        } else if (error?.error?.message) {
          toast.error(error.error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
      return throwError('');
    }),
  );
};
