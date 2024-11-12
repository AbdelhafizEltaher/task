import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { TokenInterceptor } from './app/core/interceptor/token.interceptor';
import { NetworkConnectionInterceptor } from './app/core/interceptor/network-connection.interceptor';
import { ErrorInterceptor } from './app/core/interceptor/error.interceptor';
import { routes } from './app-routers';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideStore, StoreModule } from '@ngrx/store';
import { usersReducer } from './app/core/Store/users/usersReducer';
import { HttpLoaderFactory } from './app/app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([TokenInterceptor, NetworkConnectionInterceptor, ErrorInterceptor]),
    ),
    provideStore({ users: usersReducer }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
  ],
};
