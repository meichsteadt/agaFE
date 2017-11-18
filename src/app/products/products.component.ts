import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  products;
  category: string;
  pagenumber: number = 1;
  pages: number = 0;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private auth: AuthService, private productService: ProductService) { }

  ngOnInit() {
    this.category = this.router.url;
    if(this.category !== localStorage.getItem("category")) {
      localStorage.setItem("pageNumber", "1")
      localStorage.setItem("category", this.category);
    }
    if(localStorage.getItem("pageNumber")) {
      this.pagenumber = parseInt(localStorage.getItem("pageNumber"));
    }
    this.productService.getProducts(this.category, this.pagenumber).subscribe(response => {
      this.products = response;
    });
    this.productService.getPageNumbers(this.category).subscribe(i =>{
      this.pages = Math.ceil(i["length"]/6);
    });
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
    this.productService.getProducts(this.category, this.pagenumber).subscribe(response => {
      this.products = response;
    });
    localStorage.setItem("pageNumber", this.pagenumber + "");
  }

  nextPage() {
    if (this.pagenumber == this.pages) {
      this.setPage(1);
    }
    else {
      this.setPage(this.pagenumber + 1);
    }
  }

  previousPage() {
    if (this.pagenumber == 1) {
      this.setPage(this.pages);
    }
    else {
      this.setPage(this.pagenumber -= 1)
    }
  }

}
