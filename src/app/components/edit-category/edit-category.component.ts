import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: Category = new Category();
  fatherNameCategory: string;
  constructor(private CategoryService: CategoryService
    , private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.category = JSON.parse(params['category']);
    });
  }

  ngOnInit() {
    if (this.category.ParentId != null)
      this.CategoryService.getCategoryNameByID(this.category.ParentId).subscribe((res: string) => {
        if (res)
          this.fatherNameCategory = res;

      }, (err: HttpErrorResponse) => {
        console.log(err);

      });
  }

  OnEditCategory(myForm: NgForm) {
    this.CategoryService.editCategory(this.category).subscribe((res) => {
      if (res)
        console.log(res);

    }, (err: HttpErrorResponse) => {
      console.log(err.error.Message);

    });
 }

}
