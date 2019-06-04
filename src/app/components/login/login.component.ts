import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isManager: boolean;

  constructor(private UserService: UserService, rout: ActivatedRoute) {
    rout.params.subscribe((params: any) => {
      if (params.isManager == "manager") {
        this.isManager = true;
      }
      else this.isManager = false;
    })
  }

  OnLogin(myForm: NgForm) {
    this.UserService.Login(myForm.form.value.UserRecognizeName, myForm.form.value.UserPassword).subscribe((res: User) => {
      if (res) {
        if (res.RoleId === 1)
           localStorage.setItem("RoleId", "1");
        else if (res.RoleId === 2)
          localStorage.setItem("RoleId", "2");
        else
      {localStorage.setItem("RoleId", "3");}
        localStorage.setItem("UserID", res.UserId.toString());
        localStorage.setItem("UserName", res.UserFullName.toString());
        localStorage.setItem("UserEmail", res.UserEmail.toString());
      }
    }, (err: HttpErrorResponse) => {
      alert(err.error.Message);
      
    });
  }
  // Register()
  // {
  //   this.RegisterComponent.
  // }

  ngOnInit() {
  }

}
