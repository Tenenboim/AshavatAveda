import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from '../models/product';
import {Parameter} from '../models/parameter';
import {ParameterOfProduct} from '../models/parameter-of-product';

const url = "http://localhost:65051/";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

   AddProduct(product:Product,ParameterOfProductAreExist:ParameterOfProduct[]
    , NewParameters:Parameter[],NewParameterOfProduct:ParameterOfProduct[]) {

      let dynamicObj = {
        product: product,
        ParameterOfProductAreExist: ParameterOfProductAreExist,
        NewParameters: NewParameters,
        NewParameterOfProduct: NewParameterOfProduct
      }
    //subscribe דוגמא לשליחת הרבה אוביקטים ע"י שליחה להרבה פונקציות בקונטרולר ועד שלא כל הפונקציות מחזירות תשובה לא יאותחל ה
   /*    let product_request = this.http.post(url + "api/product/AddProduct", product ) ;
      let ParameterOfProductAreExist_request = this.http.post(url + "api/product/AddProduct", ParameterOfProductAreExist ) ;
  
      forkJoin([product_request, ParameterOfProductAreExist_request]).subscribe(results => {
        // results[0] is our product_request
        // results[1] is our ParameterOfProductAreExist_request */

     return this.http.post(url + "api/product/AddProduct", dynamicObj )  ;
     
  }
  EditProduct(product:Product,ParameterOfProductAreExist:ParameterOfProduct[]
    , NewParameters:Parameter[],NewParameterOfProduct:ParameterOfProduct[]) {

      let dynamicObj = {
        product: product,
        ParameterOfProductAreExist: ParameterOfProductAreExist,
        NewParameters: NewParameters,
        NewParameterOfProduct: NewParameterOfProduct
      }
    //subscribe דוגמא לשליחת הרבה אוביקטים ע"י שליחה להרבה פונקציות בקונטרולר ועד שלא כל הפונקציות מחזירות תשובה לא יאותחל ה
   /*    let product_request = this.http.post(url + "api/product/AddProduct", product ) ;
      let ParameterOfProductAreExist_request = this.http.post(url + "api/product/AddProduct", ParameterOfProductAreExist ) ;
  
      forkJoin([product_request, ParameterOfProductAreExist_request]).subscribe(results => {
        // results[0] is our product_request
        // results[1] is our ParameterOfProductAreExist_request */

     return this.http.post(url + "api/product/AddProduct", dynamicObj )  ;
     
  }
  getLosts(userId:number)
  {
    return this.http.get(url+"api/product/getLosts?userId=" + userId);
  }
  
  getProductParametersWithValue(ProductId: number) {
    return this.http.get(url+ `api/product/getParametersWithValue/${ProductId}`);
  }
}
//getLosts צריך לטפל ב
