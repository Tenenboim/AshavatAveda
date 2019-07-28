import { Component, OnInit, Output, EventEmitter, AfterViewInit, NgZone } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ParameterOfProduct } from 'src/app/models/parameter-of-product';
import { ParameterService } from '../../services/parameter.service';
import { Parameter } from 'src/app/models/parameter';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  styles: ['agm-map { height: 400px; /* height is required */ }']
})
export class ProductComponent implements OnInit, AfterViewInit {


  kindOfPlace = { options: '' };
  product: Product = new Product();
  categories: Category[] = [];
  parametersAreExist: Parameter[] = [];
  ParameterOfProductAreExist: ParameterOfProduct[] = [];
  mainCategoryID: number;
  NewParameters: Parameter[] = [];
  NewParameterOfProduct: ParameterOfProduct[] = [];
  UserRoleId: Number = +localStorage.getItem("RoleId");
  UserList: User[] = [];

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


  constructor(private CategoryService: CategoryService, private ParameterService: ParameterService
    , private ProductService: ProductService, private UserService: UserService,
    private ngZone: NgZone) {

  }


  ngOnInit() {
    this.latitude = 32.084932;
    this.longitude = 34.835226000000034;


    this.zoom =12;
    this.NewParameterOfProduct.push(new ParameterOfProduct());
    this.NewParameters.push(new Parameter());
    //ברירת מחדל לא יהיה סוכן החכם 
    // ברירת מחדל החפץ יהיה של מציאה
    //ברירת המחדל המשתמש יצטרך לבחור מיקום במפת גוגל
    this.product.CleverAgent = false;
    this.product.LostOrFound = false;
    this.kindOfPlace.options = 'googleMap';



    if (this.UserRoleId && this.UserRoleId == 3)
      this.product.UserId = +localStorage.getItem("UserID");
    //הבאת הרשימה של המשתמשים לבחירת המשתמש שאליו שייך החפץ
    else {
      this.product.UserId = -1;
      this.UserService.UserList().subscribe((res: User[]) => {
        if (res != null) {
          this.UserList = res;
        }
      }, (err: HttpErrorResponse) => {
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
  addParameter() {
    this.NewParameters.push(new Parameter());
    this.NewParameterOfProduct.push(new ParameterOfProduct());
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

  // הפונקציה הבאה גורמת שלמוצר יהיה או תאור על מקום האבידה-אחר
  //או נקודות במפה ולא שתיהם יחד
  optionsOfPlaceAreChange() {
    if (this.kindOfPlace.options == 'googleMap')
      this.product.AddressDescription = null;
    else {
      this.product.AddressPointX = null;
      this.product.AddressPointY = null;
    }
  }
  OnAddProduct(myForm: NgForm) {
    // עדכון קוד הפרמטר-פרמטרים קיימים בטבלת פרמטרים למוצר
    for (let i = 0; i < this.parametersAreExist.length; i++) {
      this.ParameterOfProductAreExist[i].ParameterId = this.parametersAreExist[i].ParameterId;
    }
    // עדכון הקטגוריה בכל פרמטרים החדשים

    for (var i = 0; i < this.NewParameters.length; i++) {
      this.NewParameters[i].CategoryId = this.product.CategoryId != -1 ? this.product.CategoryId : this.mainCategoryID;
    }
    //כלומר כאשר יש רק קטגורית אב
    if (this.product.CategoryId == -1)
      this.product.CategoryId = this.mainCategoryID;
    this.product.AddressPointX = this.latitude;
    this.product.AddressPointY = this.longitude;
    this.ProductService.AddProduct(this.product, this.ParameterOfProductAreExist, this.NewParameters, this.NewParameterOfProduct).subscribe((res: Product[]) => {
      if (res != null) {
        console.log(res);
      }

    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
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
    this.getAddressByCoord(event.latitude, event.longitude);
  }

  markerDragEnd(event) {
    this.getAddressByCoord(event.coords.lat, event.coords.lng);
  }

  getAddressByCoord(lat: number, lng: number) {
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
  }

  // googleMap autocomplete

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.zoom =17;
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
