import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _spinnerService : SpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, 
    next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);

      this._spinnerService.setSpinner(true)

    const modifyreq = request.clone({
      setHeaders : {
        Auth : 'Token From LS'
      }
    })
    return next.handle(request).pipe(
      finalize(() => {
        this._spinnerService.setSpinner(false)
      })
    )
  }
}
