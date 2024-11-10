import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
// import { Router } from 'express';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
	const platformId = inject(PLATFORM_ID);
	const authService = inject(AuthService)
	if(isPlatformBrowser(platformId)){
		if (authService.isLoggedIn()) {
			return true;
		} else {
			  // router.navigateByUrl('/main');
			  return false;
		  }

	}
	return false;
};
