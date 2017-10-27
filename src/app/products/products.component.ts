import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
  category: string;
  pagenumber: number = 1;
  pages: number = 0;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.category = this.router.url;
    this.http.get("https://homelegance-kiosk.herokuapp.com" + this.category + "/" + this.pagenumber).subscribe(i => this.products = i);
    this.http.get("https://homelegance-kiosk.herokuapp.com" + this.category).subscribe(i => this.pages = i["length"]/6);
  }

  goToDetail(clickedProduct) {
    this.router.navigate(['products', clickedProduct["id"]])
  }

  createRange(number) {
    let arr = []
    for(let i = 1; i <= number; i ++) {
      arr.push(i)
    }
    return arr;
  }

  compare(number) {
    if (number == this.pagenumber) {
      return "active"
    }
  }

  setPage(number) {
    this.pagenumber = number;
    this.http.get("https://homelegance-kiosk.herokuapp.com" + this.category + "/" + this.pagenumber).subscribe(i => this.products = i);
  }

  nextPage() {
    if (this.pagenumber == this.pages) {
      this.pagenumber = 1;
    }
    else {
      this.pagenumber += 1;
    }
    this.http.get("https://homelegance-kiosk.herokuapp.com" + this.category + "/" + this.pagenumber).subscribe(i => this.products = i);
  }

  previousPage() {
    if (this.pagenumber == 1) {
      this.pagenumber = this.pages
    }
    else {
      this.pagenumber -= 1;
    }
    this.http.get("https://homelegance-kiosk.herokuapp.com" + this.category + "/" + this.pagenumber).subscribe(i => this.products = i);
  }

}
