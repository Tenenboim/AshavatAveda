import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ParameterOfProduct } from 'src/app/models/parameter-of-product';
import { ParameterService } from '../../services/parameter.service';
import { Parameter } from 'src/app/models/parameter';
import { ProductService } from '../../services/product.service';
import {UserService} from '../../services/user.service';
import{User} from '../../models/user';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  styles: ['agm-map { height: 300px; /* height is required */ }']
})
export class ProductComponent implements OnInit{
  
  
  kindOfPlace = { options: '' };
  product: Product = new Product();
  categories: Category[] = [];
  parametersAreExist: Parameter[] = [];
  ParameterOfProductAreExist: ParameterOfProduct[] = [];
  mainCategoryID: number;
  NewParameters: Parameter[] = [];
  NewParameterOfProduct: ParameterOfProduct[] = [];
  UserRoleId:Number=+localStorage.getItem("RoleId") ;
  UserList:User[]=[];

  // agm
  lat = 43.879078;
  lng = -103.4615581;
  selectedMarker;
 /*  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 22.33159, lng: 105.63233, alpha: 1 },
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
    { lat: 5.19334, lng: -67.03352, alpha: 1 },
    { lat: 12.09407, lng: 26.31618, alpha: 1 },
    { lat: 47.92393, lng: 78.58339, alpha: 1 }
  ]; */

  // mat  googlemap autocomplete
  public latitude: number;
  public longitude: number;


  constructor(private CategoryService: CategoryService, private ParameterService: ParameterService
    , private ProductService: ProductService,private UserService:UserService ) {
      
     }

  addParameter() {
    this.NewParameters.push(new Parameter());
    this.NewParameterOfProduct.push(new ParameterOfProduct());
  }
 

  ngOnInit(){

    this.latitude = 52.520008;
    this.longitude = 13.404954;
    this.setCurrentPosition();
    this.NewParameterOfProduct.push(new ParameterOfProduct());
    this.NewParameters.push(new Parameter());
    //ברירת מחדל לא יהיה סוכן החכם 
    // ברירת מחדל החפץ יהיה של מציאה
    this.product.CleverAgent = false;
    this.product.LostOrFound=false;

    
   
    if(this.UserRoleId&&this.UserRoleId == 3)
    this.product.UserId=+localStorage.getItem("UserID") ;
    //הבאת הרשימה של המשתמשים לבחירת המשתמש שאליו שייך החפץ
    else{
      this.product.UserId=-1;
      this.UserService.UserList().subscribe((res:User[])=>{
        if(res!=null){
          this.UserList=res;
       }
      },(err:HttpErrorResponse)=>{ 
      });
    }
    this.CategoryService.getCategories().subscribe((res: Category[]) => {
      
      if (res != null) {

        this.categories = res;
        if (this.categories != null)
          this.mainCategoryID = this.categories[0].CategoryId;
        this.onCategoryChanged(true);

      }

    }, (err: HttpErrorResponse) => {
    });

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }


  onCategoryChanged(isMain: boolean) {

    let categoryID: number;
    if (isMain) {
      categoryID = this.mainCategoryID;
      this.product.CategoryId = -1;
    } else {
      categoryID = this.product.CategoryId;
    }

    this.ParameterService.getParametersOfCategory(categoryID).subscribe((res: Parameter[]) => {
      if (res != null) {
        this.parametersAreExist = res;
        this.parametersAreExist.forEach(item => {
          let newParameter = new ParameterOfProduct();
          this.ParameterOfProductAreExist.push(newParameter);
        });

      }

    }, (err: HttpErrorResponse) => { });

  }

  OnAddProduct(myForm: NgForm) {
    // עדכון קוד הפרמטר-פרמטרים קיימים בטבלת פרמטרים למוצר
    for (let i = 0; i < this.parametersAreExist.length; i++) {
      this.ParameterOfProductAreExist[i].ParameterId = this.parametersAreExist[i].ParameterId;
    }
    // עדכון הקטגוריה בכל פרמטרים החדשים
    
    for (var i = 0; i < this.NewParameters.length; i++) {
      this.NewParameters[i].CategoryId = this.product.CategoryId!=-1?this.product.CategoryId:this.mainCategoryID;
    }
    //כלומר כאשר יש רק קטגורית אב
    if (this.product.CategoryId==-1)
    this.product.CategoryId=this.mainCategoryID;
  
    this.ProductService.AddProduct(this.product,this.ParameterOfProductAreExist,this.NewParameters,this.NewParameterOfProduct).subscribe();
  }
/*   addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  } */

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  // googleMap autocomplete

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
}
