import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponseBase } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { CoreService } from './core/core.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class LoadingInterceptor implements HttpInterceptor {


  constructor(private coreService: CoreService, private toastrService: ToastrService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.coreService.requestCounter++;
    this.coreService.spinnerOn();

    return next.handle(httpRequest).pipe(
      tap(req => {
        if (req instanceof HttpResponseBase) {
          this.coreService.requestCounter--;
          if (this.coreService.requestCounter == 0)
            this.coreService.spinnerOff();
        }
      }), catchError((error) => {
        this.coreService.requestCounter = 0;
        this.coreService.spinnerOff();
        if (typeof error.error === 'string') {
          this.toastrService.error(error.error);
        } else {
          this.toastrService.error(error.message);
        }
        return throwError(error);
      })
    );
  }

}