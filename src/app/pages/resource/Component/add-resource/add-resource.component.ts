import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ResourceService } from '../../Services/resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  addResourceForm: FormGroup;

  editingUserId: number;

  base64: string;
  imgPath: any;

  imgUrl = environment.imgUrl;

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private resourceService: ResourceService) { }

  ngOnInit() {
    this.initFormGroup();

    this.editingUserId = +this.activatedRouter.snapshot.queryParams['editUserId'];
    if (this.editingUserId) {
      this.getResource();
    }
  }
  getResource() {
    let query = { userIds: this.editingUserId };
    this.resourceService.getResources(query).subscribe(
      data => {
        this.setFormGroup(data['data'][0]);
      }
    )
  }
  setFormGroup(selectedUser) {
    //Update Password Validation to be nullable
    this.addResourceForm.get('password').setValidators([Validators.minLength(6)]);
    this.addResourceForm.get('password').updateValueAndValidity();

    this.addResourceForm.get('userName').setValue(selectedUser['userName']);
    this.addResourceForm.get('email').setValue(selectedUser['email']);
    this.addResourceForm.get('jobTitle').setValue(selectedUser['jobTitle']);
    this.addResourceForm.get('costPerHour').setValue(selectedUser['costPerHour']);
    if (selectedUser['photo']) {
      this.imgPath = this.imgUrl + selectedUser['photo'];
    }
  }
  initFormGroup() {
    this.addResourceForm = new FormGroup(
      {
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        jobTitle: new FormControl('', Validators.required),
        costPerHour: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      },
    )
  }

  addResource() {
    if (this.addResourceForm.valid) {
      if (this.editingUserId) {
        let updatedResource = { ...this.addResourceForm.value };
        updatedResource['id'] = this.editingUserId;
        updatedResource['base64'] = this.base64;
        this.resourceService.updateResource(updatedResource).subscribe(
          data => {
            this.router.navigate(['resources']);
          })
      }
      else {
        let newResource = { ...this.addResourceForm.value };
        newResource['base64'] = this.base64;
        this.resourceService.addResource(newResource).subscribe(
          data => {
            this.router.navigate(['resources']);
          })
      }
    }
  }

  getBase64(ele){
    const SelectedFile=ele.target.files[0];
    const Reader =new FileReader();
    Reader.readAsDataURL( SelectedFile );
    let self = this;
    
    Reader.addEventListener('load',function(e){
      self.imgPath = e.target.result;
      const bas64 = self.imgPath;

      self.base64 = bas64.split(',')[1];
      console.log(self.base64);
    });
  }

  deleteImg() {
    this.imgPath = null;
    this.resourceService.deleteResourceImg(this.editingUserId)
    .subscribe();
  }
}
