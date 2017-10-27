import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bedroom;
  dining;
  occasional;
  home;
  seating;
  youth;
  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3246').subscribe(response => this.dining = response["product"]["images"][0])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3456').subscribe(response => this.bedroom = response["product"]["images"][0])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3894').subscribe(response => this.youth = response["product"]["images"][0])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3689').subscribe(response => this.seating = response["product"]["images"][0])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/3941').subscribe(response => this.occasional = response["product"]["images"][0])
      this.http.get('https://homelegance-kiosk.herokuapp.com/products/4205').subscribe(response => this.home = response["product"]["images"][0])
  }
}
