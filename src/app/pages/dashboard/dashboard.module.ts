import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { DxCalendarModule, DxChartModule } from 'devextreme-angular';
import { ToAlphaMonthPipe } from './pipes/to-alpha-month.pipe';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]


@NgModule({
  declarations: [
    DashboardComponent,
    ToAlphaMonthPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DxChartModule,
    DxCalendarModule
  ]
})
export class DashboardModule { }
