import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ParameterOfProduct } from 'src/app/models/parameter-of-product';
import { ParameterService } from '../../services/parameter.service';
import { Parameter } from 'src/app/models/parameter';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product = new Product();
  categories: Category[] = [];
  parametersAreExist: Parameter[] = [];
  ParameterOfProductAreExist: ParameterOfProduct[]=[];

  NewParameters: Parameter[] = [];
  NewParameterOfProduct: ParameterOfProduct[]=[];

  constructor(private CategoryService: CategoryService, private ParameterService: ParameterService) { }

  addParameter() {
    this.NewParameters.push(new Parameter());
    this.NewParameterOfProduct.push(new ParameterOfProduct);
  }

  ngOnInit() {

    this.NewParameters.push(new Parameter());
    this.NewParameterOfProduct.push(new ParameterOfProduct);

    this.CategoryService.getCategories().subscribe((res: Category[]) => {
      if (res != null) {
     
        this.categories = res;
         if(this.categories!=null)
         this.product.CategoryId=this.categories[0].CategoryId;
         this.onCategoryChanged();

      }

    }, (err: HttpErrorResponse) => {
    });
     
  }

  
  onCategoryChanged() {

    this.ParameterService.getParametersOfCategory(this.product.CategoryId).subscribe((res: Parameter[])=> {
      if (res != null) {
        this.parametersAreExist = res;
        this.ParameterOfProductAreExist.length=this.parametersAreExist.length;
        
        
        

      }

    }, (err: HttpErrorResponse) => {    });

  }

  OnAddProduct(myForm: NgForm) {
    // עדכון קוד הפרמטר בטבלת פרמטרים למוצר
    for(let i=0;i<this.parametersAreExist.length;i++)
        {
          this.ParameterOfProductAreExist[i].ParameterId=this.parametersAreExist[i].ParameterId;
        }
        // עדכון הקטגוריה בכל פרמטרים החדשים
    for(var i=0;i<this.NewParameters.length;i++)
    {
      this.NewParameters[i].CategoryId=this.product.CategoryId;
    }
  }
}
