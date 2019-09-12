import { Component, OnInit } from '@angular/core';
import{Product}from '../../models/product';
import{ProductService}from '../../services/product.service';
import{CategoryService}from '../../services/category.service';
import{Category}from '../../models/category';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  styles: ['agm-map { height: 400px; /* height is required */ }']
})
export class SearchComponent implements OnInit {
product:Product=new Product();
roleId=+localStorage.getItem("RoleId");
categories:Category[]=[];
kindOfPlace = { options: '' };
// agm
  // link: https://alligator.io/angular/angular-google-maps/
  lat = 43.879078;
  lng = -103.4615581;
  selectedMarker;
  zoom = 2;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 22.33159, lng: 105.63233, alpha: 1 },
  ];

  // mat  googlemap autocomplete
  // link https://github.com/angular-material-extensions/google-maps-autocomplete/blob/master/README.md
  public latitude: number;
  public longitude: number;
  googleAddress: string;

  constructor(private ProductService:ProductService,private CategoryService:CategoryService) { }

  ngOnInit() {
    this.product.LostOrFound=true;
    this.latitude=32.084932;
    this.longitude = 34.835226000000034;
    this.zoom = 12;
    this.product.LostOrFound = false;
    this.kindOfPlace.options = 'googleMap';


    this.CategoryService.getAllAllCategories().subscribe((res:Category[])=>{
      if(res)
      {
        this.categories=res;
      }
    },(err:HttpErrorResponse)=>{
      Swal.fire({
        type: 'error',
        title: 'בעיה זמנית- אין קטגוריות!',
        text: 'נסה שוב מאוחר יותר...',
      })
    })
    setTimeout(() => {
      this.googleAddress=this.ProductService.getAddressByCoord(31.046051, 34.85161199999993);
   // this.getAddressByCoord(31.046051, 34.85161199999993);

    }, 700);
  }
search(){
   // הבדיקה הבאה גורמת שלמוצר יהיה או תאור על מקום האבידה-אחר
    //או נקודות במפה ולא שתיהם יחד
    if (this.kindOfPlace.options == 'googleMap') {
      this.product.AddressPointX = this.latitude;
      this.product.AddressPointY = this.longitude;
      this.product.AddressDescription = null;
    }
    else {
      this.product.AddressPointX = null;
      this.product.AddressPointY = null;
    }
}
}
