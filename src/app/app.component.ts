import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from './product.service';
import 'ahoy.js';
declare var ahoy: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent {
  title = 'app';
  category: string = "Homelegance Furniture";
  constructor(private _location: Location, private router: Router, private auth: AuthService, private http: HttpClient, private productService: ProductService) {}

  ngOnInit() {
    let url = document.URL.split("?")[1];
    let user = {};
    user["id"] = parseInt(new URLSearchParams(url).get("user"));
    if(user["id"] !== null && localStorage.getItem("user") === null) {
      this.auth.setUser(user)
    }
    localStorage.removeItem("pageNumber")

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
    this.http.post("http://localhost:3000/ahoy/visits", {});
  }

  goTo(page) {

  }

  goBack() {
    this._location.back();
  }
}
