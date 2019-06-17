import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-mokdan-or-user',
  templateUrl: './add-mokdan-or-user.component.html',
  styleUrls: ['./add-mokdan-or-user.component.css']
})
export class AddMokdanOrUserComponent implements OnInit {
user:User=new User();
public roleId:number;
  constructor(private UserService:UserService) { }
  

  ngOnInit() {
    this.roleId = +localStorage.getItem('RoleId');
  }

}
