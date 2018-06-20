import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

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
  newArrivals;
  constructor(private http: HttpClient, private userService: UserService) { }
  pagenumber: number = 1;
  ngOnInit() {
      this.user = this.userService.getUser();
      this.dining = "assets/5510-66.jpg";
      this.occasional = "assets/5438-30.jpg";
      this.home = "assets/5099-15.jpg"
      this.bedroom = "assets/5438.jpg"
      this.seating = "assets/8327TL.jpg"
      this.youth = "assets/B1799-1.jpg"
      this.newArrivals = "assets/1834.jpg"
  }

  compare(n) {
    if(n === this.pagenumber) {
      return true
    }
    else {
      return false
    }
  }

  nextPage() {
    if (this.pagenumber == 2) {
      this.setPage(1);
    }
    else {
      this.setPage(2);
    }
  }

  previousPage() {
    if (this.pagenumber == 1) {
      this.setPage(2);
    }
    else {
      this.setPage(1)
    }
  }

  setPage(n) {
    this.pagenumber = n;
  }
}
