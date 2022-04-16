import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendancesViewComponent } from '../Components/attendances-view/attendances-view.component';

const routes: Routes = [
  { path: '', component: AttendancesViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
