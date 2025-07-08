import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

// 👇 Si tu utilises déjà appConfig, ajoute dedans le provider
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // conserve les autres providers existants
    provideHttpClient()             // ✅ ajoute celui-ci pour HttpClient
  ]
}).catch(err => console.error(err));
