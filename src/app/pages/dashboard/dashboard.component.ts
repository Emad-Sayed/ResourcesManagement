import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import { DashboardService } from './dashboard.service';
import { attendanceDashboard } from './models/attendanceDashboard';
import { queryDashboard } from './models/queryDashboard';
import { taskDashboard } from './models/taskDashboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  population: any[] = [
    { country: "China", val: 1 },
    { country: "India", val: 2 },
    { country: "United States", val: 3 },
    { country: "Indonesia", val: 5 },
    { country: "Brazil", val: 3 },
  ];

  periods = [
    {
      name: 'Last Three Months',
      value: 3
    },
    {
      name: 'Last Six Months',
      value: 6
    }
  ];

  selectedPeriod: { name: string, value: number } = this.periods[1];
  // query = new dashboardQuery();
  query = new queryDashboard;
  attendances: attendanceDashboard[];
  tasks: taskDashboard[];
  totalTasks: number;
  totalPendingTasks: number;
  totalRejectedTasks: number;
  totalApprovedTasks: number;
  totalTraining: number;
  totalPendingTraining: number;
  totalRejectedTrainig: number;
  totalApprovedTraining: number;
  trainings: taskDashboard[];
  totalWorkedHoursGraph: any[];
  totalTasksGraph: any[];
  totalTrainingGraph: any[];
  totalCostGraph: any[];
  totalCost: number;
  totalWorkedHours: number;
  calendarSubscription:Subscription;

  

  showFilter: string;
  filterResultsFromToDate: { from: any, to: any } = { from: new Date(), to: new Date() };
  now: Date = new Date();
  minDateValue: Date = undefined;
  maxDateValue: Date = undefined;


  constructor(private dashboardService: DashboardService, private _headerService: HeaderService) {
    this._headerService.changeTitle.next("dashboard");
    let current = new Date();
    this.query.endDate = current.toJSON();
    this.query.startDate = new Date(current.getFullYear() + "-01-01").toJSON();
    this.filterResultsFromToDate = { from: this.query.startDate, to: this.query.endDate };
    this.getDashboardStatistics();
  }

  ngOnInit(): void {
  }

  filterResults() {
    console.log(this.filterResultsFromToDate);
    // this._headerService.calendarControl.next(this.filterResultsFromToDate);
    this.showFilter = null;
    // this._headerService.calendarSharingData(this.filterResultsFromToDate);
    this.query.startDate = this.filterResultsFromToDate.from;
    this.query.endDate = this.filterResultsFromToDate.to;
    this.getDashboardStatistics();
  }

  onPeriodChange(period: number) {
    this.selectedPeriod = this.periods.find(per => per.value === Number(period));
    this.drawAttendanceGraph();
    this.drawTasksGraph();
    this.drawTrainingsGraph();
  }
  getDashboardStatistics() {
    this.dashboardService.getDashboardStatistics(this.query).subscribe(
      (data: any) => {
        this.attendances = data[0].data
        this.tasks = data[1].data
        this.trainings = data[2].data
        this.getAttendanceStatistics();
        this.getTasksStatisitcs();
        this.getTrainingStatisitcs();
      }
    )
  }
  getAttendanceStatistics() {
    this.totalCost = 0;
    this.totalWorkedHours = 0;
    this.attendances.forEach(att => {
      this.totalCost += att.netPayment;
      this.totalWorkedHours += att.workedHours;
    })
    this.totalCost = Number(this.totalCost.toFixed());
    this.totalWorkedHours = Number(this.totalWorkedHours.toFixed());
    this.totalCost = isNaN(this.totalCost) ? 0 : this.totalCost;
    this.totalWorkedHours = isNaN(this.totalWorkedHours) ? 0 : this.totalWorkedHours;
    this.drawAttendanceGraph();
  }
  drawAttendanceGraph() {
    this.totalWorkedHoursGraph = [];
    this.totalCostGraph = [];
    let monthCounter = this.selectedPeriod.value;
    let lengthOfAllMonths = this.attendances.length - 1;
    while (monthCounter && this.attendances[lengthOfAllMonths]) {
      let workedGraphRecord = { ...this.attendances[lengthOfAllMonths] };
      let costGraphRecord = { ...this.attendances[lengthOfAllMonths] };
      workedGraphRecord['val'] = workedGraphRecord.workedHours;
      costGraphRecord['val'] = costGraphRecord.netPayment;
      this.totalWorkedHoursGraph.push(workedGraphRecord);
      this.totalCostGraph.push(costGraphRecord);
      lengthOfAllMonths--;
      monthCounter--;
    }
    this.totalWorkedHoursGraph.reverse();
    this.totalCostGraph.reverse();
  }
  drawTasksGraph() {
    this.totalTasksGraph = [];
    let monthCounter = this.selectedPeriod.value;
    let lengthOfAllMonths = this.tasks.length - 1;
    while (monthCounter && this.tasks[lengthOfAllMonths]) {
      this.tasks[lengthOfAllMonths]['val'] = this.tasks[lengthOfAllMonths].totalTasks;
      this.totalTasksGraph.push(this.tasks[lengthOfAllMonths]);
      lengthOfAllMonths--;
      monthCounter--;
    }
    this.totalTasksGraph.reverse();
  }
  drawTrainingsGraph() {
    this.totalTrainingGraph = [];
    let monthCounter = this.selectedPeriod.value;
    let lengthOfAllMonths = this.trainings.length - 1;
    while (monthCounter && this.trainings[lengthOfAllMonths]) {
      this.trainings[lengthOfAllMonths]['val'] = this.trainings[lengthOfAllMonths].totalTasks;
      this.totalTrainingGraph.push(this.trainings[lengthOfAllMonths]);
      lengthOfAllMonths--;
      monthCounter--;
    }
    
    this.totalTrainingGraph.reverse();
  }
  getTasksStatisitcs() {
    let calculations = this.getOrderStatisitcs(this.tasks);
    this.totalTasks = calculations.total;
    this.totalApprovedTasks = calculations.approved;
    this.totalRejectedTasks = calculations.rejected;
    this.totalPendingTasks = calculations.pending;
    this.drawTasksGraph();
  }
  getTrainingStatisitcs() {
    let calculations = this.getOrderStatisitcs(this.trainings);
    this.totalTraining = calculations.total;
    this.totalApprovedTraining = calculations.approved;
    this.totalRejectedTrainig = calculations.rejected;
    this.totalPendingTraining = calculations.pending;
    this.drawTrainingsGraph();
  }
  getOrderStatisitcs(order) {
    let total = 0, pending = 0, rejected = 0, approved = 0;
    order.forEach(ord => {
      total += ord.totalTasks;
      pending += ord.pending;
      rejected += ord.rejected;
      approved += ord.approved;
    })
    return { total: total, pending: pending, rejected: rejected, approved: approved };
  }
}
