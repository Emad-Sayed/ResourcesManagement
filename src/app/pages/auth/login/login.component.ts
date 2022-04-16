import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/shared/services/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private core: CoreService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      remember: new FormControl(false)
    });
  }

  loginUser() {
    this.authService.login(this.loginForm.value).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('roles', res.roles);
      this.authService.decodeToken(res.token);
      if (res.roles == "ADMIN" || res.roles == "SUPERADMIN") {
        this.router.navigate(['/dashboard']);
      }
      else {
        this.router.navigate(['/profile']);
      }
    }, error => {
      this.core.showOperationError("Invalid username or Password");
    });
  }
}
