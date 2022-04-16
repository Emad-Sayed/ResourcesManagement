import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResourceEvent } from '../model/resoureEvent';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  getProfileDependencies(taskQuery,trainQuery) {
    let events = this.http.get(environment.apiUrl + "event/GetResourceEvents");
    let attendance = this.http.get(environment.apiUrl + "Attendance/GetToDayAttendance");
    let tasks = this.http.get(environment.apiUrl + "Task/GetMyTasks",{params:taskQuery});
    let trainings = this.http.get(environment.apiUrl + "Task/GetMyTasks",{params:trainQuery});
    return forkJoin([events, attendance,tasks,trainings]);
  }
  startWork() {
    return this.http.post(environment.apiUrl + "Attendance/StartWork",{});
  }
  endWork(data) {
    return this.http.post(environment.apiUrl + "Attendance/EndWork",data);
  }
  addEvent(eventModel: ResourceEvent) {
    return this.http.post(environment.apiUrl + "event", eventModel);
  }
  getEvents() {
    return this.http.get(environment.apiUrl + "event/GetResourceEvents");
  }
  getTasksOrTraining(query){
    return this.http.get(environment.apiUrl + "Task/GetMyTasks",{params:query});
  }
  getTasksAndTraining(taskQuery,trainQuery){
    let tasks = this.http.get(environment.apiUrl + "Task/GetMyTasks",{params:taskQuery});
    let trains = this.http.get(environment.apiUrl + "Task/GetMyTasks",{params:trainQuery});
    return forkJoin([tasks,trains]);
  }
  closeAssignment(data){
    return this.http.post(environment.apiUrl + "Task/ApproveMyTask",data);
  }
}
