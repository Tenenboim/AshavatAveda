import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Parameter } from 'src/app/models/parameter';
import { ParameterOfProduct } from 'src/app/models/parameter-of-product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product = new Product();
  categories: Category[] = [];
  selectOnlyCategory:boolean;
parameters: Parameter[] = [];
ParameterOfProduct:ParameterOfProduct[];

  constructor(private CategoryService: CategoryService) {


  }

  addParameter() {
    this.parameters.push(new Parameter());
  }

  ngOnInit() {

   this.parameters.push(new Parameter());

    this.CategoryService.getCategories().subscribe((res: Category[]) => {
      if (res != null) {
        this.categories = res;
        
        }
      
    }, (err: HttpErrorResponse) => {
      alert(err.error.Message);
    });
  }


  onCategoryChanged() {
    this.selectOnlyCategory=true;
    

  }

  OnAddProduct(myForm: NgForm) {
    console.log(this.product.LostOrFound);

  }
}
