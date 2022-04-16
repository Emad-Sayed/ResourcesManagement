import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceDetailsComponent } from '../Component/resource-details/resource-details.component';
import { ResourceViewComponent } from '../Component/resource-view/resource-view.component';
import { AddResourceComponent } from '../Component/add-resource/add-resource.component';

const routes: Routes = [
  { path: '', component: ResourceViewComponent },
  { path: 'add', component: AddResourceComponent },
  { path: ':id', component: ResourceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
