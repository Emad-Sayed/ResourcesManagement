import { NgModule } from '@angular/core';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DxDateBoxModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { AssignmentsService } from './assignments.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';


@NgModule({
  declarations: [AssignmentsComponent, AddAssignmentComponent],
  imports: [
    AssignmentsRoutingModule,
    SharedModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxDateBoxModule
  ],
  providers: [AssignmentsService, UserService]
})
export class AssignmentsModule { }
