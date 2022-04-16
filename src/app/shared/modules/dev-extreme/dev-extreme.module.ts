import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxPopupModule, DxDateBoxModule, DxCalendarModule } from 'devextreme-angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    DxPopupModule,
    DxDateBoxModule,
    DxCalendarModule
  ]
})
export class DevExtremeModule { }
