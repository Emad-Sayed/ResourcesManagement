import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userProfileForm: FormGroup;
  resetPassForm: FormGroup;

  @Input() userAction: string;
  @Output() closePopup = new EventEmitter();

  loggedUser = JSON.parse(localStorage.getItem('userData'));

  constructor(private _userService: UserService) {
    this.userProfileForm = new FormGroup({
      username: new FormControl('', Validators.required),
      userEmail: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
    });

    this.resetPassForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.userAction == 'showProfile') {
      this.userProfileForm.patchValue({ username: this.loggedUser.Name, userEmail: this.loggedUser.email, jobTitle: this.loggedUser.JobTitle });
      this.userProfileForm.get('username').markAsDirty();
      this.userProfileForm.get('userEmail').markAsDirty();
      this.userProfileForm.get('jobTitle').markAsDirty();
    }
  }

  resetPassword() {
    this.userAction = 'resetPass';
  }

  saveUserEdit() {
    if (this.userProfileForm.invalid)
      return;

    let user: User = new User();
    user.userName = this.userProfileForm.get('username').value;
    user.email = this.userProfileForm.get('userEmail').value;
    user.jobTitle = this.userProfileForm.get('jobTitle').value;
    this._userService.editUserData(user)
      .subscribe(() => {
        this.closePopup.emit();
        localStorage.removeItem('userData');
        this.loggedUser['Name'] = user.userName;
        this.loggedUser['email'] = user.email;
        this.loggedUser['JobTitle'] = user.jobTitle;

        localStorage.setItem('userData', JSON.stringify(this.loggedUser));
      });
  }

  changPassword() {
    if (this.resetPassForm.invalid ||
      this.resetPassForm.controls.newPassword.value !== this.resetPassForm.controls.confirmPassword.value)
      return;
    console.log(this.resetPassForm.value);

    this._userService.changePassword({
      oldPassword: this.resetPassForm.controls.oldPassword.value,
      newPassword: this.resetPassForm.controls.newPassword.value
    })
    .subscribe(() => {this.closePopup.emit()});
  }

}
