import { NgModule } from '@angular/core';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsViewComponent } from '../Components/admins-view/admins-view.component';
import { AddAdminComponent } from '../Components/add-admin/add-admin.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { UserService } from 'src/app/shared/services/user.service';


@NgModule({
  declarations: [AdminsViewComponent, AddAdminComponent],
  imports: [
    SharedModule,
    AdminsRoutingModule
  ],
  providers: [
    UserService
  ]
})
export class AdminsModule { }
