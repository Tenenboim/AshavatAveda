import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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
  product: Product = new Product();
  roleId = +localStorage.getItem("RoleId");
  categories: Category[] = [];
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


  constructor(private ProductService: ProductService, private CategoryService: CategoryService,private router:Router) { }

  ngOnInit() {
    this.product.LostOrFound = false;
    this.kindOfPlace.options = 'googleMap';
    this.latitude = 32.084932;
    this.longitude = 34.835226000000034;
    this.zoom = 12;

    this.CategoryService.getAllAllCategories().subscribe((res: Category[]) => {
      if (res) {
        this.categories = res;
        //עדכון שבהתחלה הקטגוריה תהיה כל הקטגוריות
        this.product.CategoryId = 1;
      }
    }, (err: HttpErrorResponse) => {
      Swal.fire({
        type: 'error',
        title: 'בעיה זמנית- אין קטגוריות!',
        text: 'נסה שוב מאוחר יותר...',
      })
    })
    setTimeout(() => {
      this.googleAddress = this.ProductService.getAddressByCoord(31.046051, 34.85161199999993);
      // this.getAddressByCoord(31.046051, 34.85161199999993);

    }, 1000);
  }
  search() {
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
    // this.ProductService.getMatchesWithoutParameters(this.product).subscribe((res: Product[]) => {
    //   if (res != null) {
    //    {}
    //     this.router.navigate(['/matches',res]); }

    // }, (err: HttpErrorResponse) => {
    //   console.log(err);
    // });
  }
    //מכאן כל הפונקציות הקשורות למפות גוגל ולהשלמה אוטומטית של גוגל
    private setCurrentPosition() {
      /*    if ('geolocation' in navigator) {
           navigator.geolocation.getCurrentPosition((position) => {
             this.latitude = position.coords.latitude;
             this.longitude = position.coords.longitude;
           });
         } */
    }
    // addMarker(lat: number, lng: number) {
    //   this.markers.push({ lat, lng, alpha: 0.4 });
    // }
  
    max(coordType: 'lat' | 'lng'): number {
      return Math.max(...this.markers.map(marker => marker[coordType]));
    }
  
    min(coordType: 'lat' | 'lng'): number {
      return Math.min(...this.markers.map(marker => marker[coordType]));
    }
  
    selectMarker(event) {
      this.selectedMarker = {
        lat: event.latitude,
        lng: event.longitude
      };
     // this.getAddressByCoord(event.latitude, event.longitude);
     this.googleAddress= this.ProductService.getAddressByCoord(event.latitude, event.longitude);
    }
  
    markerDragEnd(event) {
    // this.getAddressByCoord(event.coords.lat, event.coords.lng);
    this.googleAddress=this.ProductService.getAddressByCoord(event.coords.lat, event.coords.lng);
  
    }
    onAutocompleteSelected(result: PlaceResult) {
      console.log('onAutocompleteSelected: ', result);
    }
  
    onLocationSelected(location: Location) {
      console.log('onLocationSelected: ', location);
      this.latitude = location.latitude;
      this.longitude = location.longitude;
      this.zoom = 17;
    }
  
    ngAfterViewInit(): void {
    }
  
    getCurrentLocation() {
      //   /*    setTimeout(() => {
      //        if (this.kindOfPlace.options == 'googleMap') {
      //          navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
      //        }
      //      }, 2000); */
    }
  
    // options = {
    //   enableHighAccuracy: true,
    //   timeout: 10000,
    //   maximumAge: 0
    // };
  
    // success(pos) {
    //   var crd = pos.coords;
  
    //   console.log('Your current position is:');
    //   console.log(`Latitude : ${crd.latitude}`);
    //   console.log(`Longitude: ${crd.longitude}`);
    //   console.log(`More or less ${crd.accuracy} meters.`);
    //   this.latitude = crd.latitude;
    //   this.longitude = crd.longitude;
    //   setTimeout(() => {
  
    //     this.zoom = 17;
    //   }, 2000);
    // }
  
    // error(err) {
    //   console.warn(`ERROR(${err.code}): ${err.message}`);
    // }
  
    preventSubmit(event) {
      event.preventDefault();
    }
  
}
