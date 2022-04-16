import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DxCircularGaugeModule, DxPopupModule, DxSchedulerModule } from 'devextreme-angular';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    ProfileRoutingModule,
    DxSchedulerModule,
    DxCircularGaugeModule,
    SharedModule,
    
    NgCircleProgressModule.forRoot({
      radius: 38,
      outerStrokeWidth: 4,
      innerStrokeWidth: 2,
      outerStrokeColor: "#B30813",
      innerStrokeColor: "#F0F0F0",
      animationDuration: 300,
      animation: true,
      space: 0,
      subtitleColor: '#1C466C',
      titleColor: '#1C466C',
      renderOnClick: false,
      units: '',
      subtitleFontSize: '30px',
      startFromZero: false,
      showTitle: false
    }),
    DxPopupModule
  ]
})
export class ProfileModule { }
