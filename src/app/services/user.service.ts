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
    //RoleId: 2,UserAddress: " 8 אבני נזר",UserEmail: "dovt@okmail",UserFullName: "נחמי",UserId: 6,UserPassword: "2",UserPhone: "0533105038",UserRecognizeName: "2"
  }
  Login(user: User) {
    return this.http.post(url +"api/user/Login", user);
    //{"UserId":6,"UserFullName":"נחמי",
    //"UserAddress":" 8 אבני נזר",
    //"UserEmail":"dovt@okmail",
    //"UserPhone":"0533105038",
    //"UserPassword":"2","UserRecognizeName":"2","RoleId":2}
  } 

  Register(user: User) {
    return this.http.post(url + "api/user/Register", user)  ;
  }
  UserList()
  {
    return this.http.get(url+"api/user/UserList");
    //RoleId: 1,UserAddress: "בעל התניא",UserEmail: "seminar@gmail.com",UserFullName: "מנהל",UserId: 3,UserPassword: "1",UserPhone: "11",UserRecognizeName: "a"
    //RoleId: 2,UserAddress: " 8 אבני נזר",UserEmail: "dovt@okmail",UserFullName: "נחמי",UserId: 6,UserPassword: "2",UserPhone: "0533105038",UserRecognizeName: "2"  },
    //RoleId: 3,UserAddress: "3",UserEmail: "3",UserFullName: "שרי",UserId: 7,UserPassword: "3",UserPhone: "3",UserRecognizeName: "3",
    //RoleId: 3,UserAddress: "4",UserEmail: "4",UserFullName: "מירי",UserId: 8,UserPassword: "4",UserPhone: "4",UserRecognizeName: "4",
    //RoleId: 3,UserAddress: "5",UserEmail: "5",UserFullName: "חוי",UserId: 9,UserPassword: "5",UserPhone: "5",UserRecognizeName: "5"
  }
  UpdateEditUser(user:User)
  {
    return this.http.post(url+"api/user/UpdateEditUser",user);
  }
  AddMokdanOrUser(user:User)
  {
    return this.http.post(url+"api/user/AddMokdanOrUser",user);
  }
  sendMail(formValues: string[]) {
    return this.http.post(url + "api/user/sendEmailToProductUser", formValues);
  } 

}
