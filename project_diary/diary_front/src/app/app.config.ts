import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core'; 
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { authInterceptor } from './services/auth.interceptor';

import { FormsModule } from '@angular/forms';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    importProvidersFrom(FormsModule),
    
  ]
};