import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
const url = "http://localhost:65051/";
@Injectable({
  providedIn: 'root'
})
export class UserService { 
  //spinner המשתנה הבא מיועד ל 
  //בשביל איקון שעובד כל עוד הקומפוננטה לא נבנתה
  showSpinner:boolean=false;
  constructor(private http: HttpClient) { }

  getUserById(userId:number){
    return this.http.get(url+"api/user/getUserbyId?userId="+userId);
  }
  Login(user: User) {
    return this.http.post(url +"api/user/Login", user);
  } 

  Register(user: User) {
    return this.http.post(url + "api/user/Register", user)  ;
  }
  UserList()
  {
    return this.http.get(url+"api/user/UserList");
  }
  UpdateEditUser(user:User)
  {
    return this.http.post(url+"api/user/UpdateEditUser",user);
  }
  AddMokdanOrUser(user:User)
  {
    return this.http.post(url+"api/user/AddMokdanOrUser",user);
  }
}
