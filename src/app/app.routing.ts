import { ModuleWithProviders, Input }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'dining',
    component: ProductsComponent
  },
  {
    path: 'bedroom',
    component: ProductsComponent
  },
  {
    path: 'seating',
    component: ProductsComponent
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
    component: ProductDetailComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
