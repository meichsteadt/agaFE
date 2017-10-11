import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  category: string = "Homelegance Furniture";
  constructor(private _location: Location, private router: Router) {}
  goTo(page) {

  }

  goBack() {
    this._location.back();
  }
}
