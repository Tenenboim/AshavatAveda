import { Component, OnInit } from '@angular/core';
import { User }from 'src/app/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm}from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
public roleId:number=+localStorage.getItem('RoleId');;
user:User=new User();
userId:number;
email = new FormControl('', [Validators.required, Validators.email]);
  constructor(public route: ActivatedRoute,private UserService:UserService,public router:Router) {
    route.params.subscribe(params=>{
      this.userId=params['userId'];
      //קבלת אוביקט
    //this.user=JSON.parse(params['user']);
    });
   }
   ngOnInit() {
    this.UserService.getUserById(this.userId).subscribe((res:User)=>{
      if(res)
      {
        this.user=res;
      }
    },(err:HttpErrorResponse)=>{
      console.log(err);
    });
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'אתה חייב להכניס ערך' :
      this.email.hasError('email') ? 'מייל לא תקין' :
        '';
  }

OnUpdateEditUser()
{
this.UserService.UpdateEditUser(this.user).subscribe((res:User)=>{
if(res)
{
if(+localStorage.getItem("RoleId")==3)
this.router.navigate(['/user-list']);
this.router.navigate(['/user-list']);
}
});
}
 


}
