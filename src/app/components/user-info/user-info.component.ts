import { Component, OnInit } from '@angular/core';
import{User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
userId:number;
roleId:number=+localStorage.getItem("RoleId");
userName:string=localStorage.getItem("UserName");
constructor(route: ActivatedRoute,private UserService:UserService) {
  route.params.subscribe(params=>{
  this.userId=params['userId'];
  });
 }

  ngOnInit() {
  }

}
