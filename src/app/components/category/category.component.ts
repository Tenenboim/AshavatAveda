import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/models/category";
import { CategoryService } from "src/app/services/category.service";
import { HttpErrorResponse } from "@angular/common/http";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  subCategories: Category[] = [];
  public roleId: number;
  displayedColumns = ["code", "name", "edit", "subCategory"];
  displayedColumnsSubC = ["code", "name", "edit"];
  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.roleId = +localStorage.getItem("RoleId");
    this.categoryService.getAllCategories().subscribe(
      (res: Category[]) => {
        if (res) {
          this.categories = res;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error.Message);
      }
    );
  }
  openSubCategory(categoryId: number) {
    this.subCategories = [];
    this.categories.forEach(p => {
      if (p.ParentId && p.ParentId == categoryId) {
        this.subCategories.push(p);
      }
    });
  }

  getParentCategories() {
    return this.categories.filter(item => !item.ParentId);
  }
}
