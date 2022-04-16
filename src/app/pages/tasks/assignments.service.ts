import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Assignment } from './assignment';

@Injectable()

export class AssignmentsService {
  constructor(private http: HttpClient) {}

  getTasks(query: any) {

    return this.http.get<Assignment[]>(`${environment.apiUrl}Task`, {params: query});
  }

  addTask(taskModel: Assignment) {
    return this.http.post(`${environment.apiUrl}Task/AddTask`, taskModel);
  }

  approveTasks(taskIds: number[]) {
    return this.http.post(`${environment.apiUrl}Task/AdminApproveTask`, taskIds)
  }
  rejectTasks(query: any) {
    return this.http.post(`${environment.apiUrl}Task/AdminRejectTask`, query)
  }
  reassignTasks(query: any) {
    return this.http.post(`${environment.apiUrl}Task/AdminReasignTask`, query)
  }
}