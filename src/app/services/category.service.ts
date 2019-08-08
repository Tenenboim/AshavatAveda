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

  }
  getAllCategories()
  {
    return this.http.get(url + "api/category/getAllCategories")  ;
  }
  getAllAllCategories()
  {
    return this.http.get(url + "api/category/getAllAllCategories")  ;
  }
  AddCategory(category:Category)
  {
    return this.http.post(url+"api/category/AddCategory",category);
  }
  getCategoryNameByID(CategoryId: number) {
   return this.http.get(url+"api/category/getCategoryNameByID?CategoryId="+CategoryId);
  }
  editCategory(Category:Category) {
  return this.http.post(url+"api/category/EditCategory",Category);
  }
}
