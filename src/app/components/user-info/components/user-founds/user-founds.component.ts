import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from 'src/app/services/product.service';
import{User} from '../../../../models/user';
import{Product} from '../../../../models/product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-founds',
  templateUrl: './user-founds.component.html',
  styleUrls: ['./user-founds.component.css']
})
export class UserFoundsComponent implements OnInit {
  user:User=new User();
  founds:Product[]=[];
  constructor(route: ActivatedRoute,private ProductService:ProductService) {
    route.parent.params.subscribe(params=>{
    this.user.UserId=params['userId'];
    });
   }
  ngOnInit() {
    this.ProductService.getFounds(this.user.UserId).subscribe((res:Product[])=>{
      if(res!=null)
      {
        this.founds=res;
      }
    },(err:HttpErrorResponse)=>{
      // צריך לכתוב הודעה מתאימה שאין לך מציאות

    });
  }

}
