import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = "http://localhost:65051/";

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private http: HttpClient) { }
  getParametersOfCategory(categoryId:number) {
    return this.http.get(url + "api/parameter/getParametersOfCategory?categoryId=" + categoryId);
  }
}
