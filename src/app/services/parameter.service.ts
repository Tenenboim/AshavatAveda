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
  }
  getAllParameters() {
    return this.http.get(url + "api/parameter/getAllParameters");
  }
  getProductParametersWithValue(ProductId: number) {
    return this.http.get(url+ `api/parameter/getParametersWithValue/${ProductId}`);
  }
}
