import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { AdminGuard } from '../../shared/guards/auth/admin.guard';
import { ResourceGuard } from '../../shared/guards/auth/resource.guard';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'assignment/:id',
        loadChildren: () => import('../tasks/assignments.module').then(m => m.AssignmentsModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
        canActivate: [ResourceGuard]
      }, {
        path: 'resources',
        loadChildren: () => import('../resource/Module/resources.module').then(m => m.ResourcesModule),
        canActivate: [AdminGuard]
      }
      , {
        path: 'attendance',
        loadChildren: () => import('../attendance/Module/attendance.module').then(m => m.AttendanceModule),
        canActivate: [AdminGuard]
      }
      , {
        path: 'admins',
        loadChildren: () => import('../admins/Module/admins.module').then(m => m.AdminsModule),
        canActivate: [AdminGuard]
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
