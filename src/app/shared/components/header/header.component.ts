import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  calendarState: string;
  title: string = this._headerService.changeTitle.value;

  showFilter: string;
  filterResultsFromToDate: { from: any, to: any } = { from: new Date(), to: new Date() };
  now: Date = new Date();
  minDateValue: Date = undefined;
  maxDateValue: Date = undefined;

  profilePopup = false;

  constructor(private _headerService: HeaderService, private router: Router, 
    public _authService: AuthService) { }

  ngOnInit(): void {
    this._headerService.changeTitle.subscribe(title => {
      this.title = title;
    });
    this._headerService.calendarControl.subscribe(
      (state: string) => {
        this.calendarState = state;
      }
    )
    this._headerService.setCalendarDateControl.subscribe(
      (date: any) => {
        this.filterResultsFromToDate = date;
      }
    )
  }

  filterResults() {
    console.log(this.filterResultsFromToDate);
    this._headerService.calendarControl.next(this.filterResultsFromToDate);
    this.showFilter = null;
    this._headerService.calendarSharingData(this.filterResultsFromToDate);
  }

  openProfile() {
    this.profilePopup = true;
  }

  
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }



}
