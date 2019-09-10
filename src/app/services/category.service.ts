import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Category} from 'src/app/models/category';

const url = "http://localhost:65051/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
 
  constructor(private http:HttpClient) { }
  getCategoryById(categoryId:number){
    return this.http.get(url+"api/category/getCategoryById?CategoryId=" +categoryId);
    //CategoryId: 3,CategoryName: "כסאות",ParentId: 2

  }
  getAllCategories()
  {
    return this.http.get(url + "api/category/getAllCategories")  ;
    //CategoryId: 2,CategoryName: "רהיטים",ParentId: null,
     //CategoryId: 3,CategoryName: "כסאות",ParentId: 2,
    //CategoryId: 4,CategoryName: "שולחנות",ParentId: 2
  }
  getAllAllCategories()
  {
    return this.http.get(url + "api/category/getAllAllCategories")  ;
    //CategoryId: 1,CategoryName: "כל הקטגוריות",ParentId: null,
    // CategoryId: 2,CategoryName: "רהיטים",ParentId: null,
    //CategoryId: 3,CategoryName: "כסאות",ParentId: 2,
    //CategoryId: 4,CategoryName: "שולחנות",ParentId: 2
  }
  AddCategory(category:Category)
  {
    return this.http.post(url+"api/category/AddCategory",category);
  }
  getCategoryNameByID(CategoryId: number) {
   return this.http.get(url+"api/category/getCategoryNameByID?CategoryId="+CategoryId);
   //"רהיטים"
  }
  editCategory(Category:Category) {
  return this.http.post(url+"api/category/EditCategory",Category);
  }
}
