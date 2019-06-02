import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';


import { from } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product = new Product();
  categories: Category[] = [];
  selectedParentID: number;
  constructor(private CategoryService: CategoryService) {


  }

  ngOnInit() {
    this.CategoryService.getCategories().subscribe((res: Category[]) => {
      if (res != null) {
        this.categories = res;
        if (this.categories.length) {
          this.product.CategoryId = -1;
          this.selectedParentID = this.categories[0].CategoryId;
        }
      }
    }, (err: HttpErrorResponse) => {
      alert(err.error.Message);
    });
  }

  onCategoryChanged() {
    this.product.CategoryId = -1;
  }

  OnAddProduct(myForm: NgForm) {
    console.log(this.product.LostOrFound);

  }
}
