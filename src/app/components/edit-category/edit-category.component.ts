import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: Category = new Category();
  categoryId:number;
  fatherNameCategory: string;
  constructor(private CategoryService: CategoryService
    , private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
    });
  }
  
  ngOnInit() {
     this.CategoryService.getCategoryById(this.categoryId).subscribe((res:Category)=>{
      if(res)
      {
        this.category=res;
        if (this.category.ParentId )
     { 
       this.CategoryService.getCategoryNameByID(this.category.ParentId).subscribe((res: string) => {
        if (res)
         { this.fatherNameCategory = res;}
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
    }
      }
    },(err:HttpErrorResponse)=>{
      console.log(err);
    });
    
  }

  OnEditCategory(myForm: NgForm) {
    this.CategoryService.editCategory(this.category).subscribe((res) => {
      if (res)
      {Swal.fire({
        type: 'success',
        title: 'הקטגוריה עודכנה בהצלחה',
        showConfirmButton: false,
        timer: 1500
      })}

    }, (err: HttpErrorResponse) => {
      console.log(err.error.Message);

    });
 }

}
