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
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
