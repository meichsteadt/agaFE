import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import 'ahoy.js';
declare var ahoy: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, UserService]
})
export class AppComponent {
  title = 'app';
  category: string = "Homelegance Furniture";
  time:any = new Date;
  constructor(private _location: Location, private router: Router, private auth: AuthService, private http: HttpClient, private productService: ProductService, private userService: UserService) {}

  ngOnInit() {
    let url = document.URL.split("?")[1];
    let user = {};
    user["id"] = parseInt(new URLSearchParams(url).get("user"));
    if(user["id"] !== null && localStorage.getItem("user") === null) {
      this.auth.setUser(user)
    }
    localStorage.removeItem("pageNumber")

    // this.ahoy();

    this.http.post(this.productService.url() + "/ahoy/visits", {});
    if (this.auth.getUser() === "1") {
      setInterval(i => {
        this.checkTime();
      }, 60000)
    }
    else if (document.URL.split('/')[3] !== "login") {
      this.router.navigateByUrl('categories?user=' + user["id"])
    }
  }

  goTo(page) {

  }

  goBack() {
    this._location.back();
  }

  notHome() {
    if(this.router.url.split('?')[0] !== '/') {
      return true;
    }
  }

  checkTime() {
    var now:any = new Date
    if((now - this.time)/1000 >= 600) {
      this.router.navigateByUrl('/?user=1')
    }
  }

  setTime() {
    this.time = new Date;
  }

  ahoy() {
    ahoy.reset();
    ahoy.configure({
      urlPrefix: this.productService.url(),
      visitsUrl: "/ahoy/visits",
      eventsUrl: "/ahoy/events",
      cookieDomain: null,
      page: null,
      platform: "Web",
      useBeacon: false,
      startOnReady: true
    });
  }
}
