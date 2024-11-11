import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './appConfig';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
