import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { TokenInterceptor } from './app/core/interceptor/token.interceptor';
import { NetworkConnectionInterceptor } from './app/core/interceptor/network-connection.interceptor';
import { ErrorInterceptor } from './app/core/interceptor/error.interceptor';
import { routes } from './app-routers';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './app/core/Store/users/usersReducer';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

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
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
};
