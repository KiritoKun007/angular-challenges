import {
  provideHttpClient,
  withInterceptors,
  withXhr,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { httpStatusInterceptor } from './http-status';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withXhr(), withInterceptors([httpStatusInterceptor])),
  ],
};
