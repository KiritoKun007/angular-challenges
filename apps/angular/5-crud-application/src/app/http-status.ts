import { HttpInterceptorFn } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, defer, finalize, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpStatus {
  private readonly pending = signal(0);
  readonly loading = computed(() => this.pending() > 0);
  readonly error = signal<string | null>(null);
  start() {
    this.pending.update((count) => count + 1);
  }
  finish() {
    this.pending.update((count) => count - 1);
  }
}

export const httpStatusInterceptor: HttpInterceptorFn = (request, next) => {
  const status = inject(HttpStatus);
  return defer(() => {
    status.start();
    return next(request).pipe(
      catchError((error: unknown) => {
        status.error.set('A request failed. Please retry the action.');
        return throwError(() => error);
      }),
      finalize(() => status.finish()),
    );
  });
};
