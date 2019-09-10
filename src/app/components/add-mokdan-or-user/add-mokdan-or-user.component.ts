import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-mokdan-or-user',
  templateUrl: './add-mokdan-or-user.component.html',
  styleUrls: ['./add-mokdan-or-user.component.css']
})
export class AddMokdanOrUserComponent implements OnInit {
user:User=new User();
public roleId:number;
  constructor(private UserService:UserService,private router:Router) { }
  OnAddMokdanOrUser()
  {
    this.UserService.AddMokdanOrUser(this.user).subscribe((res:User)=>{
      if(res)
     { 
      Swal.fire({
        type: 'success',
        title: 'ההוספה בוצעה בהצלחה!',
        showConfirmButton: false,
        timer: 1500
      })
       this.router.navigate(['/every-one-options']);  
     }
    }, (err: HttpErrorResponse) => {
      Swal.fire({
        type: 'error',
        title: 'נכשל!',
        text: 'משהו לא טוב קרה...'
      })
     }
    );
  }

  ngOnInit() {
    this.roleId = +localStorage.getItem('RoleId');
    this.user.RoleId = 3;
  }

}
