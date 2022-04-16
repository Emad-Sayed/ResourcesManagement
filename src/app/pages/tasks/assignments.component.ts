import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './assignment';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { asyncScheduler } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Resource } from '../resource/Model/resource';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  addAssignment: string;

  checkedTaskIds: number[] = [];

  allChecked = false;

  pagesTotalNumber: number;
  isCheckAvailable: boolean;
  states = [
    {
      name: 'Review',
      value: 0
    },
    {
      name: 'Pending',
      value: 1
    },
    {
      name: 'Rejected',
      value: 2
    },
    {
      name: 'Accepted',
      value: 3
    },
  ];
  selectedStateId = 1;
  query: any = { TypeIds: 1, TaskStateIds: [1, 2], pageSize: 5 };

  statesShown = false;



  approvePopup = false;
  rejectPopup = false;
  activeTab = 'reject';

  reassignForm: FormGroup;
  names;
  selectedResource: Resource;
  selectedAssign: Assignment;

  constructor(
    private activatedRouter: ActivatedRoute,
    private _headerService: HeaderService,
    private _userService: UserService,
    private _assignmentService: AssignmentsService) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((data: any) => {
      this.query.TypeIds = data.id;
      this.addAssignment = (this.query.TypeIds == 1) ? 'Task' : 'Training';
      this._headerService.changeTitle.next(this.addAssignment);
      this.query['pageNumber'] = 1;
      this.updateAssignments();
    })
  }
  onStateChange(ev) {
    this.selectedStateId = +ev;
    if (ev == 0) {
      this.query.TaskStateIds = [1, 2];
      this.query['approveByMe'] = true;
    }
    else {
      this.query.TaskStateIds = [ev];
      this.query['approveByMe'] = '';
    }
    this.updateAssignments();
  }
  updateAssignments() {
    this._assignmentService.getTasks(this.query).pipe(tap(assingmen => {
      this.isCheckAvailable = false;
      if (assingmen['data'].find(a => a.approvedByResource))
        this.isCheckAvailable = true;
    }))
      .subscribe(res => {
        this.assignments = res['data'];
        this.pagesTotalNumber = res['pagesTotalNumber'];
        this.statesShown = false;
      });
  }

  onTaskCheck(checked: boolean, assign: Assignment) {
    if (!assign.checked) {
      this.checkedTaskIds.push(assign.taskId);
    } else {
      const checkTaskIndex = this.checkedTaskIds.findIndex(id => id === assign.taskId);
      this.checkedTaskIds.splice(checkTaskIndex, 1);
    }
    assign.checked = checked;
  }

  checkAllTasks() {
    if (!this.allChecked) {
      this.checkedTaskIds = this.assignments.map(task => {
        if (task.approvedByResource) {
          task.checked = true;
          return task.taskId;
        }
        return -1;
      });
    } else {
      this.assignments = this.assignments.map(task => { task.checked = false; return task });
      this.checkedTaskIds = [];
    }

    this.allChecked = !this.allChecked;
  }

  onApproveTask() {
    this._assignmentService.approveTasks(this.checkedTaskIds)
      .subscribe({ next: () => { this.checkedTaskIds = []; this.approvePopup = false; } });
  }

  onChangeSize(ev) {
    this.query.pageSize = +ev;
    this.updateAssignments();
  }

  onChangePage(ev) {
    this.query = { ...this.query, pageNumber: +ev };
    this.updateAssignments();
  }

  onRejectBtnClick(assignment: Assignment) {
    this.rejectPopup = true;
    this.selectedAssign = assignment;

    this.reassignForm = new FormGroup({
      reason: new FormControl('', Validators.required)
    });

    this.selectedAssign.startDate = new Date(assignment.startDate);
    this.selectedAssign.endDate = new Date(assignment.endDate);
  }
  onRejectTask() {
    const assignTask = {
      taskId: this.selectedAssign.taskId,
      comment: this.reassignForm.value.reason,
      newStart: this.selectedAssign.startDate,
      newEnd: this.selectedAssign.endDate
    }
    if (this.activeTab === 'reject') {
      this._assignmentService.rejectTasks(assignTask)
        .subscribe({
          next: () => {
            this.updateAssignments();
            this.rejectPopup = false;
          }
        });
    } else {
      assignTask['resourceId'] = this.selectedResource.id;
      console.log(assignTask);
      this._assignmentService.reassignTasks(assignTask)
        .subscribe({
          next: () => {
            this.updateAssignments();
            this.rejectPopup = false;
          }
        });
      return
    }
  }

  onSearchName(name: string) {
    this._userService.getUserName(['RESOURCE'], name)
      .pipe(debounceTime(500, asyncScheduler))
      .subscribe(res => {
        this.names = res['data'];
      });
  }

  onSelectName(ev) {
    this.selectedResource = ev.selectedItem;
  }
}
