import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  getDashboardStatistics(query) {
    let attendanceStatistics = this.http.get(environment.apiUrl + "Attendance/GetGrouped", {params:query});
    query['typeIds'] = [1];
    let tasksStatistics = this.http.get(environment.apiUrl + "Task/GetGrouped", {params:query});
    query['typeIds'] = [2];
    let trainingStatistics = this.http.get(environment.apiUrl + "Task/GetGrouped", {params:query});
    return forkJoin([attendanceStatistics, tasksStatistics, trainingStatistics]).pipe(map((obj: any) => {
      obj.forEach(element => {
        element.data.sort(function (a, b) {
          return a.month - b.month;
        });
        element.data.sort(function (a, b) {
          return a.year - b.year;
        })
      });
      return obj;
    }));
  }
}
