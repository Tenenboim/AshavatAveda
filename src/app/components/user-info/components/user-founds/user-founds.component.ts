import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from 'src/app/services/product.service';
import{User} from '../../../../models/user';
import{Product} from '../../../../models/product';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-founds',
  templateUrl: './user-founds.component.html',
  styleUrls: ['./user-founds.component.css']
})
export class UserFoundsComponent implements OnInit {
  user:User=new User();
  founds:Product[]=[];
  constructor(private route: ActivatedRoute,private ProductService:ProductService
    ,private router:Router) {
    route.parent.params.subscribe(params=>{
    this.user.UserId=params['userId'];
    });
   }
  ngOnInit() {
    this.ProductService.getFounds(this.user.UserId).subscribe((res:Product[])=>{
      if(res!=null)
      {
        this.founds=res;
        if(this.founds.length==0)
        {  
          Swal.fire({
          type: 'error',
          title: 'אופססס',
          text: 'אין לך מציאות!'
          })
        }
      }
    },(err:HttpErrorResponse)=>{
      
    });
  }
  showMatches(product:Product){
    this.ProductService.product=product;
    this.router.navigate(['/matches']);
  }
}
