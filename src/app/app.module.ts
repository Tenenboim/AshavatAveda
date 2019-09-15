import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { RoutingModule } from './routing/routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserLostsComponent } from './components/user-info/components/user-losts/user-losts.component';
import { EveryOneOptionsComponent } from './components/every-one-options/every-one-options.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CategoryComponent } from './components/category/category.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AddMokdanOrUserComponent } from './components/add-mokdan-or-user/add-mokdan-or-user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MyMaterialModule } from './modules/my-material/my-material.module';
import{ProductEditComponent} from './components/product-edit/product-edit.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { UserFoundsComponent } from './components/user-info/components/user-founds/user-founds.component';
//import { Forbidden1Directive } from './forbidden--1.directive';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ParameterListComponent } from './components/parameter-list/parameter-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatchesComponent } from './components/matches/matches.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    UserInfoComponent,
    UserLostsComponent,
    EveryOneOptionsComponent,
    UserListComponent,
    CategoryComponent,
    UserEditComponent,
    AddMokdanOrUserComponent,
    ProductEditComponent,
    UserFoundsComponent,
    //Forbidden1Directive,
   
    AddCategoryComponent,
    EditCategoryComponent,
    ParameterListComponent,
    SpinnerComponent,
    MatchesComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6XGmiIhsaoXzLTu611HLGNL74ZEWIaSE',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
