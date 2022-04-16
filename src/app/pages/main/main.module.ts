import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SideNavComponent } from 'src/app/shared/components/side-nav/side-nav.component';
import { DxCalendarModule, DxPopupModule } from 'devextreme-angular';
import { UserDetailsComponent } from 'src/app/shared/components/user-details/user-details.component';
import { UserService } from 'src/app/shared/services/user.service';


@NgModule({
  declarations: [
    MainComponent,
    SideNavComponent,
    HeaderComponent,
    UserDetailsComponent
  ],
  imports: [
    MainRoutingModule,
    SharedModule,
    DxCalendarModule,
    DxPopupModule
  ],
  providers: [UserService]
})
export class MainModule { }
