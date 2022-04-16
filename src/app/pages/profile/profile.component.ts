import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import { ResourceEvent } from './model/resoureEvent';
import { AttendanceProfile } from './model/attendanceProfile';
import { ProfileService } from './services/profile.service';
import { Assignment } from '../tasks/assignment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { delay } from 'rxjs/operators';
import { iif } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    isAddEvent = false;
    resourceEvent: ResourceEvent;
    attendance: AttendanceProfile = new AttendanceProfile();
    tasks: Assignment[];
    trainings: Assignment[];
    taskTotalRows: number;
    trainingTotalRows: number;
    taskQuery = { typeIds: [1], pageNumber: 1, pageSize: 5, taskStateIds: [1, 2] };
    trainQuery = { typeIds: [2], pageNumber: 1, pageSize: 5, taskStateIds: [1, 2] };
    activeTab = 'tasks';

    appointmentsData: any[] = [];
    resourcesData: any[] = [
        {
            text: "Samantha Bright",
            id: 1,
            color: "#cb6bb2"
        }, {
            text: "John Heart",
            id: 2,
            color: "#56ca85"
        }, {
            text: "Todd Hoffman",
            id: 3,
            color: "#1e90ff"
        }, {
            text: "Sandra Johnson",
            id: 4,
            color: "#ff9747"
        }
    ]
    prioritiesData: any[] = [
        {
            text: "Low Priority",
            id: 1,
            color: "#1e90ff"
        }, {
            text: "High Priority",
            id: 2,
            color: "#ff9747"
        }
    ];
    currentDate: Date = new Date();

    endTimePopup = false;
    showCommentForm = false;
    exceptionAttendanceForm = new FormGroup({
        comment: new FormControl('', Validators.required),
        exceptionHours: new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)])
    });

    constructor(
        private profileService: ProfileService,
        private _headerService: HeaderService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this._headerService.changeTitle.next(this.authService.CurrentUserName);
        this.getProfileDependencies();
    }

    dayClicked(ev) {
        this.isAddEvent = false;
        setTimeout(() => {
            if (!this.isAddEvent) {
                this.dayConfirmed(ev);
            }
        }, 500);
    }
    dayConfirmed(ev) {
        this.taskQuery['specificDate'] = new Date(ev.cellData.startDate).toJSON();
        this.trainQuery['specificDate'] = new Date(ev.cellData.startDate).toJSON();
        this.profileService.getTasksAndTraining(this.taskQuery, this.trainQuery)
            .subscribe(
                data => {
                    this.taskQuery.pageNumber = 1;
                    this.tasks = data[0]['data'];
                    this.taskTotalRows = data[0]['pagesTotalNumber']
                    this.trainQuery.pageNumber = 1;
                    this.trainings = data[1]['data'];
                    this.trainingTotalRows = data[1]['pagesTotalNumber']
                }
            )
    }
    onEventPopUp() {
        this.isAddEvent = true;
    }
    onEventAdd(event) {
        let appoinetementData = event.appointmentData;
        this.resourceEvent = new ResourceEvent
            (appoinetementData.startDate,
                appoinetementData.endDate,
                appoinetementData.text,
                appoinetementData.description);
        this.profileService.addEvent(this.resourceEvent).subscribe(
            data => {
                this.getEvents();
            }
        )
    }
    getProfileDependencies() {
        this.profileService.getProfileDependencies(this.taskQuery, this.trainQuery).subscribe(
            data => {
                this.drawEvents(data[0]['data']);
                this.drawAttendance(data[1]);
                this.taskTotalRows = data[2]['pagesTotalNumber']
                this.tasks = data[2]['data'];
                this.trainingTotalRows = data[3]['pagesTotalNumber']
                this.trainings = data[3]['data'];
            }
        )
    }
    //#region  attendance
    drawAttendance(attendanceData) {
        this.attendance.isAttendanceSet = attendanceData['status'];
        if (this.attendance.isAttendanceSet) {
            this.attendance.hours = attendanceData['data'].hours;
            this.attendance.minues = attendanceData['data'].minues;
            this.attendance.startTimeCounting();
        }
    }
    startWork() {
        this.profileService.startWork().subscribe(
            data => {
                this.attendance.startTimeCounting();
            }
        )
    }
    endWork() {
        let query=this.showCommentForm? this.exceptionAttendanceForm.value:{};
        debugger
        this.profileService.endWork(query).subscribe(
            data => {
                this.attendance.endTimeCounting();
                this.endTimePopup=false;
            }
        );
    }
    //#endregion

    //#region events
    useTrickyOnSchedule() {
        this.appointmentsData.splice(0, 0, {
            startDate: new Date("2000-01-01"),
            endDate: new Date("2500-01-01"),
            priority: 1, ownerId: [1, 2]
        })
    }
    getEvents() {
        this.profileService.getEvents().subscribe(
            data => {
                this.drawEvents(data['data']);
            }
        )
    }
    drawEvents(appoints) {
        if (appoints) {
            this.appointmentsData = appoints.map(e =>
                ({ startDate: e['start'], endDate: e['end'], text: e['name'] }));
            this.useTrickyOnSchedule();
        }
    }
    //#endregion

    //#region  task train
    getTasks() {
        this.profileService.getTasksOrTraining(this.taskQuery).subscribe(
            data => {
                this.tasks = data['data'];
                this.taskTotalRows = data['pagesTotalNumber']
            }
        )
    }
    getTraining() {
        this.profileService.getTasksOrTraining(this.trainQuery).subscribe(
            data => {
                this.trainings = data['data'];
                this.trainingTotalRows = data['pagesTotalNumber']
            }
        )
    }
    onChangeTasksPage(page) {
        this.taskQuery.pageNumber = page;
        this.getTasks();
    }
    onChangeTaskSize(size) {
        this.taskQuery.pageSize = size;
        this.getTasks();
    }
    onChangeTrainingsPage(page) {
        this.trainQuery.pageNumber = page;
        this.getTraining();
    }
    onChangeTrainSize(size) {
        this.trainQuery.pageSize = size;
        this.getTraining();
    }
    closeAssignment(id, type) {
        this.profileService.closeAssignment([id]).subscribe(
            data => {
                if (type == 1)
                    this.tasks = this.tasks.filter(t => t.taskId != id);
                else
                    this.trainings = this.trainings.filter(t => t.taskId != id);
            }
        )
    }
    //#endregion
}
