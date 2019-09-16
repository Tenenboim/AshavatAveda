import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Category } from 'src/app/models/category';
import { ParameterOfProduct } from 'src/app/models/parameter-of-product';
import { ParameterService } from '../../services/parameter.service';
import { Parameter } from 'src/app/models/parameter';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ParametersWithParametersOfProduct } from 'src/app/models/parametersOfCategoryWithParametersOfProduct';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  styles: ['agm-map { height: 400px; /* height is required */ }']

})
export class ProductEditComponent implements OnInit {

  product: Product = new Product();
  productId: number;
  categories: Category[] = [];
  parametersAreExist: Parameter[] = [];
  ParameterOfProductAreExist: ParameterOfProduct[] = [];
  mainCategoryID: number;
  NewParameters: Parameter[] = [];
  NewParameterOfProduct: ParameterOfProduct[] = [];
  kindOfPlace = { options: '' };
  StartCategory: Category;//קטגוריה המכילה את הקטגוריה של המוצר לפני שנוי כלומר בעת טעינת הקומפוננטה
  parametersOfCategoryWithParametersOfProduct: ParametersWithParametersOfProduct[] = [];//מערך שמאותחל בטעינת הקומפוננטה בפרמטרים עם הפרמטרים של המוצר


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

  constructor(private route: ActivatedRoute, private CategoryService: CategoryService, private ParameterService: ParameterService
    , private ProductService: ProductService, private UserService: UserService,
    private ngZone: NgZone,private router:Router) {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });
  }

  ngOnInit() {

    this.getProduct();
  }

  getProduct() {
    //this.UserService.showSpinner = true;
    this.ProductService.getProduct(this.productId).subscribe((res: Product) => {
      if (res) {
        this.product = res;
        this.makeThingsForgoogleMapsAndParameters()

      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
  makeThingsForgoogleMapsAndParameters() {
    if (this.product.AddressPointX != null) {
      this.latitude = this.product.AddressPointX;
      this.longitude = this.product.AddressPointY;
      this.zoom = 17;
    }
    else {
      this.latitude = 32.084932;
      this.longitude = 34.835226000000034;
      this.zoom = 12;
    }
    this.NewParameterOfProduct.push(new ParameterOfProduct());
    this.NewParameters.push(new Parameter());

    //של מיקום המציאה להיות לפי מה שנבחר כלומר מפות או תאור מיקום חופשי checkbox השורות הבאות גורמות ל
    if (this.product.AddressDescription)
      this.kindOfPlace.options = 'otherPlace';
    else
      this.kindOfPlace.options = 'googleMap';

      this.getAllCategories();
    setTimeout(() => {

      //this.getAddressByCoord(this.latitude, this.longitude);
      this.googleAddress = this.ProductService.getAddressByCoord(this.latitude, this.longitude);

    }, 2000);
   
  }
  getAllCategories() {
    this.CategoryService.getAllCategories().subscribe((res: Category[]) => {
      if (res != null) {
        this.categories = res;
        this.StartCategory = this.categories.find(p => p.CategoryId == this.product.CategoryId);
        if (this.StartCategory.ParentId != null) {
          this.mainCategoryID = this.StartCategory.ParentId;
        } else {
          this.mainCategoryID = this.product.CategoryId;
          this.product.CategoryId = -1;
        }
        this.getProductParametersWithValue()
      }
    }, (err: HttpErrorResponse) => {
    });
  }
  //value שליחה לפונקציה שמחזירה מערך עם הפרמטרים הקשורים לקטגוריה של המוצר+ה
  getProductParametersWithValue() {
    this.ParameterService.getProductParametersWithValue(this.product.ProductId).subscribe((res: ParametersWithParametersOfProduct[]) => {
      if (res.length) {
        this.parametersOfCategoryWithParametersOfProduct = res;
      }
    //  this.UserService.showSpinner = false;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }


  addParameter() {
    this.NewParameters.push(new Parameter());
    this.NewParameterOfProduct.push(new ParameterOfProduct());
  }
  onCategoryChanged(isMain: boolean) {

    this.parametersOfCategoryWithParametersOfProduct = [];
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
  // optionsOfPlaceAreChange() {
  //   if (this.kindOfPlace.options == 'googleMap')
  //     this.product.AddressDescription = null;
  //   else {
  //     this.product.AddressPointX = null;
  //     this.product.AddressPointY = null;
  //   }
  // }
  OnEditProduct(myForm: NgForm) {
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
    this.ProductService.EditProduct(this.product,
      this.ParameterOfProductAreExist,
      this.NewParameters,
      this.NewParameterOfProduct, this.parametersOfCategoryWithParametersOfProduct).subscribe((res: Product) => {
        if (res != null) {
          this.ProductService.product=res;
          this.router.navigate(['/matches']);
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
  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

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
    //this.getAddressByCoord(event.latitude, event.longitude);
    this.googleAddress = this.ProductService.getAddressByCoord(event.latitude, event.longitude);

  }

  markerDragEnd(event) {
    //this.getAddressByCoord(event.coords.lat, event.coords.lng);
    this.googleAddress = this.ProductService.getAddressByCoord(event.coords.lat, event.coords.lng);

  }

  // getAddressByCoord(lat: number, lng: number) {
  //   let geocoder = new google.maps.Geocoder;
  //   let latlng = new google.maps.LatLng(lat, lng);

  //   let request: any = {
  //     latLng: latlng
  //   };

  //   geocoder.geocode(request, (results, status) => {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       if (results[0] != null) {
  //         this.ngZone.run(() => {
  //           this.googleAddress = results[0].formatted_address;
  //         });
  //       } else {
  //         alert("No address available");
  //       }
  //     }
  //   });
  // }

  // googleMap autocomplete

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.zoom = 17;
  }

  getCurrentLocation() {
    // this.getAddressByCoord(this.latitude, this.longitude);

    /*    setTimeout(() => {
         if (this.kindOfPlace.options == 'googleMap') {
           navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
         }
       }, 2000); */
  }

  options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    this.latitude = crd.latitude;
    this.longitude = crd.longitude;
    setTimeout(() => {

      this.zoom = 17;
    }, 2000);
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  preventSubmit(event) {
    event.preventDefault();
  }


}
