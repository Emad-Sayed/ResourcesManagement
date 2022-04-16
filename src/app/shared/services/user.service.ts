import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';

@Injectable()

export class UserService {
  constructor(private http: HttpClient) {}

  getUserName(roleIds: string[], keyword: string) {
    const query = { roles: roleIds, keyWord: keyword };
    return this.http.get<User[]>(`${environment.apiUrl}User/UserFilter`, { params: query });
  }
  editUserData(newUser: User) {
    return this.http.put(`${environment.apiUrl}User`, newUser);
  }
  addAdmin(admin) {
    return this.http.post(environment.apiUrl + "User/CreateAdmin", admin);
  }

  changePassword(passwords) {
    return this.http.put(`${environment.apiUrl}User/ChangePassword`, passwords);
  }
}