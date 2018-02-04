import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import 'ahoy.js';
declare var ahoy: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  bedroom;
  dining;
  occasional;
  home;
  seating;
  youth;
  user;
  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
      this.user = this.userService.getUser();
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3246').subscribe(response => this.dining = response["product"]["thumbnail"])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3456').subscribe(response => this.bedroom = response["product"]["thumbnail"])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3894').subscribe(response => this.youth = response["product"]["thumbnail"])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3689').subscribe(response => this.seating = response["product"]["thumbnail"])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3941').subscribe(response => this.occasional = response["product"]["thumbnail"])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/4205').subscribe(response => this.home = response["product"]["thumbnail"])
      if (this.user !== "1") {
        ahoy.trackView();
      }
  }
}
