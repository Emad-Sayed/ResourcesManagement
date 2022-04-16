import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/pages/attendance/services/attendance.service';
import { attendanceDashboard } from 'src/app/pages/dashboard/models/attendanceDashboard';
import { Assignment } from 'src/app/pages/tasks/assignment';
import { AssignmentsService } from 'src/app/pages/tasks/assignments.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { Resource } from '../../Model/resource';
import { ResourceService } from '../../Services/resource.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss']
})
export class ResourceDetailsComponent implements OnInit {

  resourceId: number;

  resourceDetail: Resource;

  attendances: attendanceDashboard[];
  tasks: Assignment[];
  trainings: Assignment[];

  tasksTotalPages = { num: 0, current: 1 };
  trainingTotalPages = { num: 0, current: 1 };
  attendanceTotalPages = { num: 0, current: 1 };

  query: any = { PageSize: 5, approved: true };

  imgUrl = environment.imgUrl;

  constructor(
    private actRoute: ActivatedRoute,
    private _resourceService: ResourceService,
    private _headerService: HeaderService,
    private _attendanceService: AttendanceService,
    private _assignmentService: AssignmentsService
  ) { }

  ngOnInit() {
    this._headerService.setCalendarState('off');

    this.resourceId = this.actRoute.snapshot.params.id;

    this._resourceService.getResources({ UserIds: [this.resourceId] })
      .subscribe(res => {
        this.resourceDetail = res['data'][0];
        this._headerService.changeTitle.next(this.resourceDetail['userName']);
      });
  }
  openAccordionItem(ev) {
    const title = ev['itemData']['title'];
    this.query['ResourceIds'] = [this.resourceId];
    if (ev.itemElement.lastElementChild.style.display === '') {
      ev.itemElement.lastElementChild.style.display = 'none';
    } else {
      ev.itemElement.lastElementChild.style.removeProperty('display');
    }
    this.query['ResourcesIds'] = [this.resourceId];
    switch (title) {
      case 'Attendance':
        this.getResourceAttendance(this.query);
        break;
      case 'Tasks':
        this.query['TypeIds'] = [1];
        this.getResourceAssignment(this.query);
        break;
      case 'Trainings':
        this.query['TypeIds'] = [2];
        this.getResourceAssignment(this.query);
        break;
    }
  }

  getResourceAttendance(query: any) {
    this._attendanceService.getAttendance(query)
      .subscribe(res => {
        this.attendances = res['data'];
        this.attendanceTotalPages['num'] = res['pagesTotalNumber'];
      });
  }

  getResourceAssignment(query: any) {
    this._assignmentService.getTasks(query)
      .subscribe(res => {
        if (query['TypeIds'][0] === 1) {
          this.tasks = res['data'];
          this.tasksTotalPages['num'] = res['pagesTotalNumber'];
        } else {
          this.trainings = res['data'];
          this.trainingTotalPages['num'] = res['pagesTotalNumber'];
        }
      });
  }

  changeAttendancePage(pageNum) {
    this.attendanceTotalPages['current'] = pageNum;
    this.query.pageNumber = this.attendanceTotalPages['current'];
    this.getResourceAttendance(this.query);
  }
  changeTaskPage(pageNum) {
    this.query['TypeIds'] = [1];
    this.tasksTotalPages['current'] = pageNum;
    this.query.pageNumber = this.tasksTotalPages['current'];
    this.getResourceAssignment(this.query);
  }
  changeTrainingPage(pageNum) {
    this.query['TypeIds'] = [2];
    this.trainingTotalPages['current'] = pageNum;
    this.query.pageNumber = this.trainingTotalPages['current'];
    this.getResourceAssignment(this.query);
  }

}
