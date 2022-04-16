import { Injectable } from '@angular/core';
import { throwError, Observable, of, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  requestCounter: number = 0;
  spinnerSubject = new Subject<boolean>();
  searchNotifier = new Subject<string>();
  constructor(private title: Title, private toastrService: ToastrService) { }

  handleBaseError(error: any) {
    return throwError(error);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client side error : ', errorResponse.error.message);
      } else {
        console.error('Server side error : ', errorResponse.error);
      }
      return of(result as T);
    }
  }

  public changeTabTitle(title: string) {
      this.title.setTitle(title);
  }
  spinnerOn() {
      this.spinnerSubject.next(true);
  }
  spinnerOff() {
      this.spinnerSubject.next(false);
  }

  showOperationSuccess() {
      this.toastrService.success('Operation Success');
  }

  showWarning(message: string) {
      this.toastrService.warning(message);
  }

  showOperationError(error) {
      this.toastrService.error(error);
  }

}
