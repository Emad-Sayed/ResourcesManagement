import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admins-view',
  templateUrl: './admins-view.component.html',
  styleUrls: ['./admins-view.component.scss']
})
export class AdminsViewComponent implements OnInit {
  admins: any;

  imgUrl = environment.imgUrl;

  constructor(private headerService: HeaderService, private _userService: UserService) { }

  ngOnInit() {
    this.headerService.changeTitle.next("Admins");

    this._userService.getUserName(['ADMIN'], '')
    .subscribe(res => {
      this.admins = res['data'];
    });
  }

}
