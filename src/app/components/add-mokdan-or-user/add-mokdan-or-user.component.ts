import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-mokdan-or-user',
  templateUrl: './add-mokdan-or-user.component.html',
  styleUrls: ['./add-mokdan-or-user.component.css']
})
export class AddMokdanOrUserComponent implements OnInit {
public roleId:number;
  constructor() { }

  ngOnInit() {
    this.roleId = +localStorage.getItem('RoleId');
  }

}
