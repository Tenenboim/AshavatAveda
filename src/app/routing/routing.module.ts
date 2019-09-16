import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes,RouterModule} from '@angular/router'
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UserLostsComponent } from '../components/user-info/components/user-losts/user-losts.component';
import{UserFoundsComponent} from '../components/user-info/components/user-founds/user-founds.component';
import{UserListComponent} from '../components/user-list/user-list.component';
import{ProductComponent} from '../components/product/product.component';
import{CategoryComponent} from '../components/category/category.component';
import {EveryOneOptionsComponent} from '../components/every-one-options/every-one-options.component';
import {UserEditComponent} from '../components/user-edit/user-edit.component';
import {AddMokdanOrUserComponent} from '../components/add-mokdan-or-user/add-mokdan-or-user.component';
import {ProductEditComponent} from '../components/product-edit/product-edit.component';
import {AddCategoryComponent} from '../components/add-category/add-category.component';
import { EditCategoryComponent } from '../components/edit-category/edit-category.component';
import { ParameterListComponent} from '../components/parameter-list/parameter-list.component';
import {MyGuardGuard} from '../my-guard.guard';
import{MatchesComponent} from '../components/matches/matches.component';
import{HomeComponent}from '../components/home/home.component';
import{SearchComponent}from '../components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },  
 // { path: 'login/:isManager', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'user-info/:userId', component: UserInfoComponent, children: [
      { path: 'user-losts', component: UserLostsComponent },
     { path: 'user-founds', component: UserFoundsComponent },
    ]
  },
  { path: 'user-list', component: UserListComponent,canActivate:[MyGuardGuard] },
  { path: 'product', component: ProductComponent },
  { path: 'category-list', component: CategoryComponent,canActivate:[MyGuardGuard] },
  { path: 'every-one-options', component: EveryOneOptionsComponent ,canActivate:[MyGuardGuard]},
  { path: 'user-edit/:userId', component: UserEditComponent },
  //שליחת אוביקט
  //{ path: 'user-edit/:user', component: UserEditComponent },
  { path: 'add-mokdan-or-user', component: AddMokdanOrUserComponent,canActivate:[MyGuardGuard] },
  { path: 'product-edit/:productId', component: ProductEditComponent },
  { path: 'add-category', component: AddCategoryComponent,canActivate:[MyGuardGuard] },
  { path: 'edit-category/:categoryId', component: EditCategoryComponent },
  { path: 'parameter-list', component: ParameterListComponent ,canActivate:[MyGuardGuard]},
  { path: 'matches', component: MatchesComponent }
 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})

export class RoutingModule { }
