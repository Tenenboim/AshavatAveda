import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from 'src/app/services/product.service';
import{User} from '../../../../models/user';
import{Product} from '../../../../models/product';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-losts',
  templateUrl: './user-losts.component.html',
  styleUrls: ['./user-losts.component.css']
})
export class UserLostsComponent implements OnInit {
  user:User=new User();
  losts:Product[]=[];
  constructor(route: ActivatedRoute,private ProductService:ProductService) {
    route.parent.params.subscribe(params=>{
    this.user.UserId=params['userId'];
    });
   }
  ngOnInit() {
    this.ProductService .getLosts(this.user.UserId).subscribe((res:Product[])=>{
      if(res!=null)
      {
        this.losts=res;
        if(this.losts.length==0)
        {  
          Swal.fire({
          type: 'error',
          title: 'אופססס',
          text: 'אין לך אבידות!'
          })
        }
      }
    },(err:HttpErrorResponse)=>{
      
    });
  }

}
