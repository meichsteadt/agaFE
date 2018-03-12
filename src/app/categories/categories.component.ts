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
      this.dining = "assets/5510-66.jpg";
      this.occasional = "assets/5438-30.jpg";
      this.home = "assets/5099-15.jpg"
      this.bedroom = "assets/5438.jpg"
      this.seating = "assets/8327TL.jpg"
      this.youth = "assets/B1799-1.jpg"
      ahoy.trackView();
  }
}
