import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Category } from 'src/app/models/category';
import { ParameterOfProduct } from 'src/app/models/parameter-of-product';
import { ParameterService } from '../../services/parameter.service';
import { Parameter } from 'src/app/models/parameter';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ParametersWithParametersOfProduct } from 'src/app/models/parametersWithParametersOfProduct';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = new Product();
  categories: Category[] = [];
  parametersAreExist: Parameter[] = [];
  ParameterOfProductAreExist: ParameterOfProduct[] = [];
  mainCategoryID: number;
  NewParameters: Parameter[] = [];
  NewParameterOfProduct: ParameterOfProduct[] = [];
  kindOfPlace = { options: '' };
  StartCategory: Category;//קטגוריה המכילה את הקטגוריה של המוצר לפני שנוי כלומר בעת טעינת הקומפוננטה
  parametersWithParametersOfProduct: ParametersWithParametersOfProduct[] = [];



  constructor(route: ActivatedRoute, private CategoryService: CategoryService, private ParameterService: ParameterService
    , private ProductService: ProductService, private UserService: UserService) {
    route.params.subscribe(params => {
      this.product = JSON.parse(params['product']);
    });
  }

  ngOnInit() {
    this.CategoryService.getCategories().subscribe((res: Category[]) => {
      if (res != null) {
        this.categories = res;
        this.StartCategory = this.categories.find(p => p.CategoryId == this.product.CategoryId);

        if (this.StartCategory.ParentId) {
          this.mainCategoryID = this.StartCategory.ParentId;
        } else {
          this.mainCategoryID = this.product.CategoryId;
          this.product.CategoryId=-1;
        }
      }

    }, (err: HttpErrorResponse) => {
    });

    this.ProductService.getProductParametersWithValue(this.product.ProductId).subscribe((res: ParametersWithParametersOfProduct[]) => {
      if (res.length) {
        this.parametersWithParametersOfProduct = res;
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
    })

  }


  onCategoryChanged(isMain: boolean) {

    this.parametersWithParametersOfProduct = [];
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

  OnEditProduct(myForm: NgForm) {
    // עדכון קוד הפרמטר-פרמטרים קיימים בטבלת פרמטרים למוצר
    for (let i = 0; i < this.parametersAreExist.length; i++) {
      this.ParameterOfProductAreExist[i].ParameterId = this.parametersAreExist[i].ParameterId;
    }
    // עדכון הקטגוריה בכל פרמטרים החדשים

    for (var i = 0; i < this.NewParameters.length; i++) {
      this.NewParameters[i].CategoryId = this.product.CategoryId != -1 ? this.product.CategoryId : this.mainCategoryID;
    }
    //כלומר כאשר יש רק קטגורית אב
    if (this.product.CategoryId == -1)
      this.product.CategoryId = this.mainCategoryID;

    this.ProductService.EditProduct(this.product, this.ParameterOfProductAreExist, this.NewParameters, this.NewParameterOfProduct).subscribe();
  }

}
