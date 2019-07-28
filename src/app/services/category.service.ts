import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Category} from 'src/app/models/category';

const url = "http://localhost:65051/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  getCategories()
  {
    return this.http.get(url + "api/category/getAllCategories")  ;
  }
  AddCategory(category:Category)
  {
    return this.http.post(url+"api/category/AddCategory",category);
  }
}
