import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import{Product} from '../../models/product';
import { Category } from 'src/app/models/category';
import { ParameterOfProduct } from 'src/app/models/parameter-of-product';
import { ParameterService } from '../../services/parameter.service';
import { Parameter } from 'src/app/models/parameter';
import { ProductService } from '../../services/product.service';
import {UserService} from '../../services/user.service';
import{User} from '../../models/user';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
product: Product=new Product();
categories: Category[] = [];
parametersAreExist: Parameter[] = [];
ParameterOfProductAreExist: ParameterOfProduct[] = [];
mainCategoryID: number;
NewParameters: Parameter[] = [];
NewParameterOfProduct: ParameterOfProduct[] = [];
kindOfPlace = { options: '' };



UserRoleId:Number=+localStorage.getItem("RoleId") ;
  constructor(route: ActivatedRoute) { 
    route.params.subscribe(params=>{
      this.product=JSON.parse(params['product']);
      });
  }

  ngOnInit() {

  }

}
