import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes,RouterModule} from '@angular/router'
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UserLostsComponent } from '../components/user-info/components/user-losts/user-losts.component';
import{UserListComponent} from '../components/user-list/user-list.component';
import{ProductComponent} from '../components/product/product.component';
import{CategoryComponent} from '../components/category/category.component';
import {EveryOneOptionsComponent} from '../components/every-one-options/every-one-options.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/:isManager', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'user-info/:userId', component: UserInfoComponent, children: [
      { path: '', redirectTo: 'user-losts', pathMatch: 'full' },
      { path: 'user-losts', component: UserLostsComponent },
    ]
  },
  { path: 'user-list', component: UserListComponent },
  { path: 'product', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'every-one-options', component: EveryOneOptionsComponent }
 
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
