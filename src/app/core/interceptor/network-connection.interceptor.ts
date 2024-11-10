import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ToasterService } from '../services/uiServices/toaster.service';

export const NetworkConnectionInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToasterService);
  const startTime = Date.now();
  return next(req).pipe(tap(() => {
	const elapsedTime = Date.now() - startTime;
	const threshold = 5000;
	if (elapsedTime > threshold) {
	  toast.warning("Slow network detected");
	}
  }));
};
