import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Attendance } from '../../Models/attendance';
import { AttendanceService } from '../../services/attendance.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-attendances-view',
  templateUrl: './attendances-view.component.html',
  styleUrls: ['./attendances-view.component.scss']
})
export class AttendancesViewComponent implements OnInit {
  attendances: Attendance[];
  selectedIds: number[] = [];
  isAllSelected = false;
  pagesTotalNumber: number;
  subscription: Subscription;
  query = { pageNumber: 1, pageSize: 5 };
  rejectPopup = false;
  reviewException: Attendance;

  constructor(private attendanceService: AttendanceService, private headerService: HeaderService) { }

  ngOnInit() {
    this.getAttendances();
    this.headerService.changeTitle.next("Attendances");
  }


  getAttendances() {
    this.attendanceService.getAttendance(this.query).subscribe(
      data => {
        this.attendances = data['data'];
        this.pagesTotalNumber = data['pagesTotalNumber'];
      }
    )
  }
  selectAll() {
    this.isAllSelected = !this.isAllSelected;
    this.attendances.forEach(att => {
      if (!att.comment) {
        att['checked'] = this.isAllSelected ? true : false;
        (this.isAllSelected) ? this.selectedIds.push(att.id) : this.selectedIds = []
      }
    });
  }
  onAttendanceCheck(isChecked, attendance) {
    isChecked ? this.selectedIds.push(attendance.id) : this.selectedIds = this.selectedIds.filter(id => id != attendance.id);
  }
  approveAttendances() {
    this.attendanceService.approveAttendances(this.selectedIds).subscribe(
      data => {
        this.attendances = this.attendances.filter(att => !this.selectedIds.includes(att.id));
        this.selectedIds = [];
      }
    )
  }
  onChangePage(pageNumber) {
    this.query.pageNumber = pageNumber;
    this.getAttendances();
  }
  onChangeSize(pageSize) {
    this.query.pageSize = pageSize;
    this.getAttendances();
  }
  review(attendance) {

    this.reviewException = attendance;

    this.rejectPopup = true;
  }
  approveException() {
    this.attendanceService.approveException({id: this.reviewException.id})
    .subscribe(() => {
      this.rejectPopup = false;
      this.attendances = this.attendances.filter(att => att.id != this.reviewException.id);
    });
  }
  rejectException() {
    this.attendanceService.approveAttendances([this.reviewException.id])
    .subscribe(() => {
      this.rejectPopup = false;
      this.attendances = this.attendances.filter(att => att.id != this.reviewException.id);
    });
  }
  reject(id) {
    this.attendanceService.rejectAttendance([id]).subscribe(
      data => {
        this.attendances = this.attendances.filter(att => att.id != id);
      }
    )
  }
}
