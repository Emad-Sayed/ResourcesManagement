import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getAttendance(query: any) {
    return this.http.get(`${environment.apiUrl}Attendance/AttendanceFilter`, {params: query})
  }
  approveAttendances(ids) {
    return this.http.post(`${environment.apiUrl}Attendance/GetAdminApprove`, ids)
  }
  rejectAttendance(ids) {
    return this.http.post(`${environment.apiUrl}Attendance/GetAdminRejection`, ids)
  }
  approveException(query) {
    return this.http.post(`${environment.apiUrl}Attendance/GetAdminExceptionApprove`, null, {params: query})
  }
}
