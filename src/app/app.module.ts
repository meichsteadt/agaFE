import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { UserGuardService } from './user-guard.service';
import { AuthService } from './auth.service';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';
=======
import { YouthComponent } from './youth/youth.component';

>>>>>>> 226f0c790533e57ad5263dc13723d146641f7c7d

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
<<<<<<< HEAD
    LoginComponent,
    UserComponent,
    UserLoginComponent,
=======
    YouthComponent,
>>>>>>> 226f0c790533e57ad5263dc13723d146641f7c7d
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    HttpClientModule
  ],
  providers: [AuthGuardService, UserGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
