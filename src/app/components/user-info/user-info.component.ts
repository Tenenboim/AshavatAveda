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
user:User=new User();
constructor(route: ActivatedRoute,private UserService:UserService) {
  route.params.subscribe(params=>{
  this.user.UserId=params['userId'];
  });
 }

  ngOnInit() {
  }

}
