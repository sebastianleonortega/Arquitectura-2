import {Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {HomeComponent} from "./modules/home/pages/home/home.component";
import {RegisterComponent} from "./modules/auth/register/register.component";
import {AdministrationComponent} from "./modules/home/pages/administration/administration.component";
import {authGuard} from "./core/guards/auth.guard";
import {Page404Component} from "./shared/page-404/page-404.component";

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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdministrationComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: Page404Component
  }
];
