import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Parameter}from '../models/parameter';
const url = "http://localhost:65051/";

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  deleteParameter(ParameterId: number) {
    return this.http.get(url+"api/parameter/deleteParameter?parameterId="+ParameterId);
  }

  constructor(private http: HttpClient) { }
  getParametersOfCategory(categoryId:number) {
    return this.http.get(url + "api/parameter/getParametersOfCategory?categoryId=" + categoryId);
    //מתאים לשליחת categoryId=2
    //CategoryId: 1,ParameterId: 1,ParameterName: "צבע",
    //CategoryId: 2,ParameterId: 3,ParameterName: "רוחב",
    //CategoryId: 2,ParameterId: 6,ParameterName: "סוג עץ"
  }
  getAllParameters() {
    return this.http.get(url + "api/parameter/getAllParameters");
    //CategoryId: 3,ParameterId: 2,ParameterName: "אורך",
     //CategoryId: 1,ParameterId: 1,ParameterName: "צבע",
    //CategoryId: 2,ParameterId: 3,ParameterName: "רוחב",
    //CategoryId: 2,ParameterId: 6,ParameterName: "סוג עץ"
  }
  getProductParametersWithValue(ProductId: number) {
    return this.http.get(url+ `api/parameter/getParametersWithValue/${ProductId}`);
    //צבע:חום,רוחב:3 מטר,סוג עץ:פורמייקה
  }
}
