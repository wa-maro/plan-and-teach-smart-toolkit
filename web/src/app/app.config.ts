import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { EnvConfig } from '@shared/types/config';
import { credentialsInterceptor, errorInterceptor } from '@shared/interceptors';

export const ENV_CONFIG = new InjectionToken<EnvConfig>('env.config');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([credentialsInterceptor, errorInterceptor])),
    {
      provide: ENV_CONFIG,
      useValue: {
        apiUrl: 'http://localhost:3301/api/v1',
        adminApiUrl: 'http://localhost:3301/api/v1/admin',
      },
    },
  ],
};
