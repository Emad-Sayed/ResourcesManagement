import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';

import { AssignmentsComponent } from './assignments.component';

const routes: Routes = [
  { 
    path: '', 
    component: AssignmentsComponent 
  },
  {
    path: 'add-assignment',
    component: AddAssignmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
