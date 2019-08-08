import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isManager: boolean;

  constructor(private UserService: UserService, private rout: ActivatedRoute, private router: Router) {
    rout.params.subscribe((params: any) => {
      if (params.isManager == "manager") {
        this.isManager = true;
      }
      else this.isManager = false;
    })
  }

  OnLogin(myForm: NgForm) {
    this.UserService.Login(this.user).subscribe((res: User) => {
      if (res) {
        Swal.fire({
          type: 'success',
          title: 'הכניסה הצליחה',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem("UserID", res.UserId.toString());
        localStorage.setItem("UserName", res.UserFullName.toString());
        localStorage.setItem("UserEmail", res.UserEmail.toString());
        if (res.RoleId === 3)
         {
          localStorage.setItem("RoleId", "3");
          this.router.navigate(['/user-info', res.UserId]); 
         }
        else
          { 
            if (res.RoleId === 2)
              localStorage.setItem("RoleId", "2");
            else
              localStorage.setItem("RoleId", "1");
            this.router.navigate(['/every-one-options']);     
          }
        
      }
    }, (err: HttpErrorResponse) => {
      Swal.fire({
        type: 'error',
        title: 'נכשל!',
        text: 'הטלפון נכון? נסה שוב...',
      })

    });
  }
  // Register()
  // {
  //   this.RegisterComponent.
  // }

  ngOnInit() {
  }

}
