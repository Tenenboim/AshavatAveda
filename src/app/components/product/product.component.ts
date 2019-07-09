import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ParameterOfProduct } from 'src/app/models/parameter-of-product';
import { ParameterService } from '../../services/parameter.service';
import { Parameter } from 'src/app/models/parameter';
import { ProductService } from '../../services/product.service';
import {UserService} from '../../services/user.service';
import{User} from '../../models/user';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  
  kindOfPlace = { options: '' };
  product: Product = new Product();
  categories: Category[] = [];
  parametersAreExist: Parameter[] = [];
  ParameterOfProductAreExist: ParameterOfProduct[] = [];
  mainCategoryID: number;
  NewParameters: Parameter[] = [];
  NewParameterOfProduct: ParameterOfProduct[] = [];
  UserRoleId:Number=+localStorage.getItem("RoleId") ;
  UserList:User[]=[];

  constructor(private CategoryService: CategoryService, private ParameterService: ParameterService
    , private ProductService: ProductService,private UserService:UserService ) {
      
     }

  addParameter() {
    this.NewParameters.push(new Parameter());
    this.NewParameterOfProduct.push(new ParameterOfProduct());
  }
 

  ngOnInit(){

    this.NewParameterOfProduct.push(new ParameterOfProduct());
    this.NewParameters.push(new Parameter());
    //ברירת מחדל לא יהיה סוכן החכם 
    // ברירת מחדל החפץ יהיה של מציאה
    this.product.CleverAgent = false;
    this.product.LostOrFound=false;

    
   
    if(this.UserRoleId&&this.UserRoleId == 3)
    this.product.UserId=+localStorage.getItem("UserID") ;
    //הבאת הרשימה של המשתמשים לבחירת המשתמש שאליו שייך החפץ
    else{
      this.product.UserId=-1;
      this.UserService.UserList().subscribe((res:User[])=>{
        if(res!=null){
          this.UserList=res;
       }
      },(err:HttpErrorResponse)=>{ 
      });
    }
    this.CategoryService.getCategories().subscribe((res: Category[]) => {
      if (res != null) {

        this.categories = res;
        if (this.categories != null)
          this.mainCategoryID = this.categories[0].CategoryId;
        this.onCategoryChanged(true);

      }

    }, (err: HttpErrorResponse) => {
    });

  }


  onCategoryChanged(isMain: boolean) {

    let categoryID: number;
    if (isMain) {
      categoryID = this.mainCategoryID;
      this.product.CategoryId = -1;
    } else {
      categoryID = this.product.CategoryId;
    }

    this.ParameterService.getParametersOfCategory(categoryID).subscribe((res: Parameter[]) => {
      if (res != null) {
        this.parametersAreExist = res;
        this.parametersAreExist.forEach(item => {
          let newParameter = new ParameterOfProduct();
          this.ParameterOfProductAreExist.push(newParameter);
        });

      }

    }, (err: HttpErrorResponse) => { });

  }

  OnAddProduct(myForm: NgForm) {
    // עדכון קוד הפרמטר-פרמטרים קיימים בטבלת פרמטרים למוצר
    for (let i = 0; i < this.parametersAreExist.length; i++) {
      this.ParameterOfProductAreExist[i].ParameterId = this.parametersAreExist[i].ParameterId;
    }
    // עדכון הקטגוריה בכל פרמטרים החדשים
    
    for (var i = 0; i < this.NewParameters.length; i++) {
      this.NewParameters[i].CategoryId = this.product.CategoryId!=-1?this.product.CategoryId:this.mainCategoryID;
    }
    //כלומר כאשר יש רק קטגורית אב
    if (this.product.CategoryId==-1)
    this.product.CategoryId=this.mainCategoryID;
  
    this.ProductService.AddProduct(this.product,this.ParameterOfProductAreExist,this.NewParameters,this.NewParameterOfProduct).subscribe();
  }
}
