import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  addAdminForm: FormGroup;

  base64: string;
  imgPath: any;

  constructor(private router: Router, private _userService: UserService) {}

  ngOnInit() {
    this.initFormGroup();
  }
  initFormGroup() {
    this.addAdminForm = new FormGroup(
      {
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        // phone: new FormControl('', [Validators.required]),
        jobTitle: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      },
    )
  }
  addAdmin() {
    if (this.addAdminForm.valid) {
      const admin = this.addAdminForm.value;
      admin['costPerHour'] = 0;
      admin['base64'] = this.base64;
      this._userService.addAdmin(admin).subscribe(
        data => {
          this.router.navigate(['admins']);
        })
    }
  }

  getBase64(ele){
    const SelectedFile=ele.target.files[0]
    const Reader =new FileReader();
    Reader.readAsDataURL( SelectedFile );
    let self = this;
    
    Reader.addEventListener('load',function(e){
      self.imgPath = e.target.result;
      const bas64 = self.imgPath;

      self.base64 = bas64.split(',')[1];
      console.log(self.base64);
      ele = null;
    });
  }

  deleteImg() {
    this.imgPath = null;
    this.base64 = null;
  }

}
