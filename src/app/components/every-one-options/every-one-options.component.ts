import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-every-one-options',
  templateUrl: './every-one-options.component.html',
  styleUrls: ['./every-one-options.component.css']
})
export class EveryOneOptionsComponent implements OnInit {
  public roleId:number;
  constructor() { }

  ngOnInit() {
    this.roleId = +localStorage.getItem('RoleId');
  }

}
