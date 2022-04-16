import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { asyncScheduler, } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { HeaderService } from 'src/app/shared/services/header.service';
import { Assignment } from '../assignment';
import { AssignmentsService } from '../assignments.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {
  isSpecificResource = false;
  typeIds: number;
  assignmentTitle: string;
  addTaskForm: FormGroup;
  names = [];

  selectedResource: User = new User();

  constructor(
    private activatedRouter: ActivatedRoute,
    private _headerService: HeaderService,
    private _assignmentService: AssignmentsService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.typeIds = +this.activatedRouter.snapshot.params['id'];
    this.assignmentTitle = (this.typeIds == 1) ? 'Task' : 'Training';
    this.activatedRouter.queryParams.subscribe(data => {
      if (data['resource']) {
        this.isSpecificResource = true;
        this.selectedResource.id = +data['resource'];
      }
    });
    this._headerService.changeTitle.next(this.assignmentTitle);
    this.addTaskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      priorityId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  addTask() {
    if (this.addTaskForm.valid) {
      const task: Assignment = this.addTaskForm.value;
      task['resourceId'] = this.selectedResource.id;
      task['typeId'] = this.typeIds;
      task['priorityId'] = +task['priorityId'];
      this.names = [];
      this._assignmentService.addTask(task)
        .subscribe({ next: () => this.addTaskForm.reset() });
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
