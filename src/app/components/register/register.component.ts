import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User=new User();
  public roleId:number;

  constructor(private UserService:UserService) { }

  OnRegister()
  {
    console.log(this.user);
     this.UserService.Register(this.user).subscribe((res:User)=>{
       console.log(res);
       if(res)
       {
        if (!localStorage.getItem("UserId") )
        {
          localStorage.setItem("RoleId", "3");
          localStorage.setItem("UserID", res.UserId.toString());
          localStorage.setItem("UserName", res.UserFullName.toString());

        }
        // if (res.RoleId === 1)
        //    localStorage.setItem("RoleId", "1");
        // else if (res.RoleId === 2)
        //   localStorage.setItem("RoleId", "2");
        // else
        // localStorage.setItem("RoleId", "3");
        // localStorage.setItem("UserID", res.UserId.toString());
        // localStorage.setItem("UserName", res.UserFullName.toString());
       }

     }, (err: HttpErrorResponse) => {
      alert(err.error.Message);
     });
  }

  ngOnInit() {
    this.roleId = +localStorage.getItem('RoleId');
  }

}
