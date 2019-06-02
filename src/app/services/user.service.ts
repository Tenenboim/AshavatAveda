import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
const url = "http://localhost:65051/";
@Injectable({
  providedIn: 'root'
})
export class UserService { 

  constructor(private http: HttpClient) { }

  Login(name: string, password: string) {
    return this.http.get(url + "api/user/Login?UserRecognizeName=" + name + "&Password=" + password);
  } 

  Register(user: User) {
    return this.http.post(url + "api/user/Register", user)  ;
  }
  UserList()
  {
    return this.http.get(url+"api/user/UserList");
  }
}
