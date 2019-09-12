import { Injectable,NgZone  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from '../models/product';
import {Parameter} from '../models/parameter';
import {ParameterOfProduct} from '../models/parameter-of-product';
import{ParametersWithParametersOfProduct}from '../models/parametersOfCategoryWithParametersOfProduct';
const url = "http://localhost:65051/";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  googleAddress: string;

  constructor(private http: HttpClient,private ngZone: NgZone) { }

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
    , NewParameters:Parameter[],NewParameterOfProduct:ParameterOfProduct[],parametersOfCategoryWithParametersOfProduct:ParametersWithParametersOfProduct[]) {

      let dynamicObj = {
        product: product,
        ParameterOfProductAreExist: ParameterOfProductAreExist,
        NewParameters: NewParameters,
        NewParameterOfProduct: NewParameterOfProduct,
        parametersOfCategoryWithParametersOfProduct:parametersOfCategoryWithParametersOfProduct

      }
    //subscribe דוגמא לשליחת הרבה אוביקטים ע"י שליחה להרבה פונקציות בקונטרולר ועד שלא כל הפונקציות מחזירות תשובה לא יאותחל ה
   /*    let product_request = this.http.post(url + "api/product/AddProduct", product ) ;
      let ParameterOfProductAreExist_request = this.http.post(url + "api/product/AddProduct", ParameterOfProductAreExist ) ;
  
      forkJoin([product_request, ParameterOfProductAreExist_request]).subscribe(results => {
        // results[0] is our product_request
        // results[1] is our ParameterOfProductAreExist_request */

     return this.http.post(url + "api/product/EditProduct", dynamicObj )  ;
     
  }
  getLosts(userId:number)
  {
    return this.http.get(url+"api/product/getLosts?userId=" + userId);
    //AddressDescription: "אשל אברהם",AddressPointX: null,AddressPointY: null,CategoryId: 2,CleverAgent: true,DateFound: "2019-07-12T00:00:00",LostOrFound: true,ProductDescription: null,ProductId: 1,ProductName: "ספריה",UserId: 6,WasDone: false
  }
  getFounds(userId:number)
  {
    return this.http.get(url+"api/product/getFounds?userId=" + userId);
    //AddressDescription: null,AddressPointX: 32.084932,AddressPointY: 34.835226000000034,CategoryId: 3,CleverAgent: false,DateFound: "2019-06-20T00:00:00",LostOrFound: false,ProductDescription: null,ProductId: 3,ProductName: "כסא מטבח",UserId: 6,WasDone: false,
  }
  
  getProduct(ProductId:number){
    return this.http.get(url+"api/product/getProduct?ProductId=" + ProductId);
    //AddressDescription: "אשל אברהם"תAddressPointX: null,AddressPointY: null,CategoryId: 2,CleverAgent: true,DateFound: "2019-07-12T00:00:00",LostOrFound: true,ProductDescription: null,ProductId: 1,ProductName: "ספריה",UserId: 6,WasDone: false
  }
  getMatches(ProductId:number){
    return this.http.get(url+"api/product/getMatches?ProductId=" + ProductId);
    
  }
  getMatchesWithoutParameters(product: Product) {
    this.http.post(url+"api/product/getMatchesWithoutParameters", product)
  }
  getAddressByCoord(lat: number, lng: number) {
    console.log("lat= "+lat+" long= "+lng);
    
    let geocoder = new google.maps.Geocoder;
    let latlng = new google.maps.LatLng(lat, lng);

    let request: any = {
      latLng: latlng
    };

    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
          this.ngZone.run(() => {
            this.googleAddress = results[0].formatted_address;
          });
        } else {
          alert("No address available");
        }
      }
    });
    return this.googleAddress;
    //בעל התניא 16 בני ברק ישראל
  }
  
}

