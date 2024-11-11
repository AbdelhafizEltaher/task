import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./app/modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./app/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: 'auth' },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules,
});
