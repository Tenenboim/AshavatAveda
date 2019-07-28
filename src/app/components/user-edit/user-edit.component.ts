import { Component, OnInit } from '@angular/core';
import { User }from 'src/app/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm}from '@angular/forms';
import {UserService} from 'src/app/services/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
public roleId:number;
u:User=new User();
  constructor(public route: ActivatedRoute,private UserService:UserService,public router:Router) {
    route.params.subscribe(params=>{
    this.u=JSON.parse(params['user']);
    });
   }
OnUpdateEditUser()
{
this.UserService.UpdateEditUser(this.u).subscribe((res:User)=>{
if(res)
{
//console.log(res);
this.router.navigate(['/user-list']);}
});
}
 
ngOnInit() {
    this.roleId=+localStorage.getItem('RoleId');
   
  }

}
