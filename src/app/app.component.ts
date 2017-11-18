import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  category: string = "Homelegance Furniture";
  constructor(private _location: Location, private router: Router, private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    let url = document.URL.split("?")[1];
    let user = {};
    user["id"] = parseInt(new URLSearchParams(url).get("user"));
    if(user["id"] !== null && localStorage.getItem("user") === null) {
      this.auth.setUser(user)
    }
    localStorage.removeItem("pageNumber")
  }

  goTo(page) {

  }

  goBack() {
    this._location.back();
  }
}
