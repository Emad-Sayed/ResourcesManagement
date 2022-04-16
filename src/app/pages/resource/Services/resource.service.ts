import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ResourceService {

  constructor(private http: HttpClient) { }
  getResources(query) {
    return this.http.get(environment.apiUrl + "User/UserFilter", { params: query })
  }
  addResource(resource) {
    return this.http.post(environment.apiUrl + "User/CreateResource", resource);
  }
  updateResource(resource) {
    return this.http.put(environment.apiUrl + "User/UpdateResource", resource);
  }
  deleteResourceImg(resourceId) {
    return this.http.post(environment.apiUrl + "User/DeleteUserImage", null, {params: {userId: resourceId}});
  }
}
