import { ModuleWithProviders, Input }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuardService } from './auth-guard.service';
import { UserGuardService } from './user-guard.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dining',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'bedroom',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'seating',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'youth',
    component: ProductsComponent
  },
  {
    path: 'home',
    component: ProductsComponent
  },
  {
    path: 'occasional',
    component: ProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'user-login',
    component: UserLoginComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
