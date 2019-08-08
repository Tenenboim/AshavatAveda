import { Component, OnInit } from '@angular/core';
import { User }from 'src/app/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm}from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
public roleId:number=+localStorage.getItem('RoleId');;
user:User=new User();
userId:number;
  constructor(public route: ActivatedRoute,private UserService:UserService,public router:Router) {
    route.params.subscribe(params=>{
      this.userId=params['userId'];
      //קבלת אוביקט
    //this.user=JSON.parse(params['user']);
    });
   }
OnUpdateEditUser()
{
this.UserService.UpdateEditUser(this.user).subscribe((res:User)=>{
if(res)
{
//console.log(res);
//this.router.navigate(['/user-list']);
}
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

}
