import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  category: string = "Homelegance Furniture";
  constructor(private _location: Location, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    let url = new URL(document.URL);
    let user = {};
    user["id"] = url.searchParams.get("user");
    if(user["id"] !== null) {
      this.auth.setUser(user)
    }
  }
  
  goTo(page) {

  }

  goBack() {
    this._location.back();
  }
}
