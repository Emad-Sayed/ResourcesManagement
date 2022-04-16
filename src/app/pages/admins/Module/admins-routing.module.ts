import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from '../Components/add-admin/add-admin.component';
import { AdminsViewComponent } from '../Components/admins-view/admins-view.component';


const routes: Routes = [
  { path: '', component: AdminsViewComponent},
  {
    path: 'add',
    component: AddAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
