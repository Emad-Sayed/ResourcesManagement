import { NgModule } from '@angular/core';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourceViewComponent } from '../Component/resource-view/resource-view.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ResourceDetailsComponent } from '../Component/resource-details/resource-details.component';
import { DxAccordionModule } from 'devextreme-angular';
import { AttendanceService } from "src/app/pages/attendance/services/attendance.service";
import { AssignmentsService } from '../../tasks/assignments.service';
import { AddResourceComponent } from '../Component/add-resource/add-resource.component';
import { ResourceService } from '../Services/resource.service';


@NgModule({
  declarations: [
    ResourceViewComponent,
    ResourceDetailsComponent,
    AddResourceComponent
  ],
  imports: [
    ResourcesRoutingModule,
    SharedModule,
    DxAccordionModule
  ],
  providers: [
    AttendanceService,
    AssignmentsService,
    ResourceService
  ]
})
export class ResourcesModule { }
