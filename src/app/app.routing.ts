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
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'dining',
    component: ProductsComponent,
  },
  {
    path: 'bedroom',
    component: ProductsComponent,
  },
  {
    path: 'seating',
    component: ProductsComponent,
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
    path: 'products/search',
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
    canActivate: [AuthGuardService]
  },
  {
    path: 'user-login',
    component: UserLoginComponent
  },
  {
    path: 'sub-categories/:category',
    component: SubCategoriesComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'products/sub-categories/:category',
    component: ProductsComponent
  },
  {
    path: 'new-arrivals',
    component: NewArrivalsComponent
  }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
