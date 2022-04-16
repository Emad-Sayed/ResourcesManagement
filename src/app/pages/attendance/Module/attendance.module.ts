import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendancesViewComponent } from '../Components/attendances-view/attendances-view.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AttendanceService } from '../services/attendance.service';
import { DxPopupModule } from 'devextreme-angular';


@NgModule({
  declarations: [AttendancesViewComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule,
    DxPopupModule
  ],
  providers:[AttendanceService]
})
export class AttendanceModule { }
