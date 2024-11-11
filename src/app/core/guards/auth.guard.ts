import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { Router } from 'express';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
	const _router = inject(Router);
	const platformId = inject(PLATFORM_ID);
	const authService = inject(AuthService)
	if(isPlatformBrowser(platformId)){
		if (authService.isLoggedIn()) {
			return true;
		} else {
			_router.navigateByUrl('/auth');
			  return false;
		  }

	}
	return false;
};
