import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isAdmin = this.auth.CurrentUserRole === 'ADMIN' || this.auth.CurrentUserRole === 'SUPERADMIN';
  popupVisible = false;

  userSelectedAction: string;

  navLinks = [];

  responsiveMenuOpened = false;

  constructor(private auth: AuthService,private router:Router) {}

  ngOnInit(): void {
    if (this.isAdmin) {
      this.navLinks = [
        {
          title: 'Dashboard',
          iconClass: 'icon-dashboard',
          router: '/dashboard'
        },

        {
          title: 'Resources',
          iconClass: 'icon-resources',
          router: '/resources'
        },

        {
          title: 'Attendance',
          iconClass: 'icon-attendance',
          router: '/attendance'
        },

        {
          title: 'Tasks',
          iconClass: 'icon-task',
          router: '/assignment/1'
        },

        {
          title: 'Training',
          iconClass: 'icon-training',
          router: '/assignment/2'
        },

        {
          title: 'Admins',
          iconClass: 'icon-profile',
          router: '/admins'
        }
      ];
    }
    else {
      this.navLinks = [
        // {
        //   title: 'Dashboard',
        //   iconClass: 'icon-dashboard',
        //   router: '/dashboard'
        // },
        {
          title: 'Profile',
          iconClass: 'icon-profile',
          router: '/profile'
        },
      ];
    }

    this.router.events.subscribe(() => (this.responsiveMenuOpened = false));
  }

inputForUserComponent  : any ;


  openPopup(IsOpenMyProfile: any) {
    let currentUserId = this.auth.CurrentUserId;
    console.log(currentUserId)
    this.inputForUserComponent = IsOpenMyProfile ? { userId: currentUserId } : undefined;
    this.popupVisible = true;
    this.userSelectedAction = IsOpenMyProfile;

    // const dialogRef = this.dialog.open(UserAddComponent
    //   , {
    //     data: IsOpenMyProfile ? { userId: currentUserId } : undefined
    //   }
    // );

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }


  closeAddUserPopup(isclose: boolean) {
    this.popupVisible = !isclose;
    this.userSelectedAction = null;
  }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }
}
