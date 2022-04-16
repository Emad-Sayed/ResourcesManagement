

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtService: JwtHelperService) { }

  login(loginModel: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'auth', loginModel);
  }
  decodeToken(token){
    localStorage.setItem("userData",
    JSON.stringify(this.jwtService.decodeToken(token))); 
  }
  get CurrentUserId(){ return JSON.parse(localStorage.getItem('userData'))['Id'] }
  get CurrentUserName(){ return JSON.parse(localStorage.getItem('userData'))['Name'] }
  get CurrentUserRole(): string { return localStorage.getItem('roles').split(',')[0]; }
  
  get CurrentUserCustomerId(): string { return localStorage.getItem('roles').split(',')[1]; }
}
