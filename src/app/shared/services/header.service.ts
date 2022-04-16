
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  changeTitle = new BehaviorSubject('dashboard');
  calendarControl = new Subject();
  calendarSharingDataControl = new Subject();
  setCalendarDateControl = new Subject();
  setCalendarState(state){
    this.calendarControl.next(state);
  }
  calendarSharingData(obj){
    this.calendarSharingDataControl.next(obj);
  }  
  calendarSetData(obj){
    this.setCalendarDateControl.next(obj);
  }
}
