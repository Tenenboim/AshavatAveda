import { Component, OnInit } from '@angular/core';
import {Category} from 'src/app/models/category';
import {CategoryService} from 'src/app/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories:Category[]=[];
  public roleId:number;
  constructor(public categoryService:CategoryService) { }

  ngOnInit() {
    this.roleId=+localStorage.getItem('RoleId');
    this.categoryService.getAllCategories().subscribe((res: Category[]) => {
      if (res) {
        this.categories = res;
      }
    },(err: HttpErrorResponse) => {
        console.log(err.error.Message);
    });  
  }

}
