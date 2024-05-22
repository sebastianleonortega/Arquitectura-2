import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {HomeComponent} from "./modules/home/pages/home/home.component";
import {ProductComponent} from "./modules/home/pages/product/product.component";
import {RegisterComponent} from "./modules/auth/register/register.component";

export const routes: Routes = [

  {
    path: '',
    pathMatch: "full",
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
