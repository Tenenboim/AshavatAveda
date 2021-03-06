import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
users:User[]=[];
  constructor(private UserService:UserService) { }

  ngOnInit() {
    this.UserService.UserList().subscribe((res:User[])=>{
   if(res)
   {
    this.users=res;
   }
    },(err: HttpErrorResponse) => {
    alert(err.error.Message);
   
    });
  }

}
