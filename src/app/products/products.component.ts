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
  search: boolean = false;
  searchParams: string;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private auth: AuthService, private productService: ProductService) { }

  ngOnInit() {
    this.closeModal();
    this.category = this.router.url.split('/').pop();
    this.route.params.subscribe(params => {
      if(params['search']) {
        this.searchParams = params['search']
        this.search = true;
        this.checkPageNumber(this.searchParams);
        this.setPage(this.pagenumber)
      }
      else {
        params['category']? this.category = params['category'] : false
        this.checkPageNumber(this.category);
        this.setPage(this.pagenumber);
      }
    });
  }

  getSearchProducts(search) {
    this.productService.search(search, this.auth.getUser(), this.pagenumber).subscribe(response => {
      this.products = response["products"]
      this.pages = Math.ceil(response["pages"]/6)
    })
  }

  checkPageNumber(category) {
    if(category !== localStorage.getItem("category")) {
      localStorage.setItem("pageNumber", "1")
      localStorage.setItem("category", category);
    }
    if(localStorage.getItem("pageNumber")) {
      this.pagenumber = parseInt(localStorage.getItem("pageNumber"));
    }
  }

  getProducts(category, pagenumber) {
    if(this.router.url.split('/').includes('sub-categories')) {
      this.productService.getProductsFromSubCategory(category, pagenumber, this.auth.getUser()).subscribe(response => {
        this.products = response["products"];
        this.pages = Math.ceil(response["pages"]/6);
      }, error => this.catchError(error));
    }
    else {
      this.productService.getProducts(category, pagenumber, this.auth.getUser()).subscribe(response => {
        this.products = response;
      }, error => this.catchError(error));
      this.productService.getPageNumbers(category).subscribe(i =>{
        this.pages = Math.ceil(i["length"]/6);
      }, error => this.catchError(error));
    }
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
    if(this.search) {
      this.getSearchProducts(this.searchParams);
    }
    else {
      this.getProducts(this.category, number);
    }
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

  closeModal() {
    var body = document.getElementsByTagName("body")[0]
    body.classList.remove("modal-open");
    var modal = document.getElementsByClassName("modal-backdrop")[0]
    if( modal) {
      body.removeChild(modal);
    }
  }

  catchError(error) {
    console.log(error)
  }
}
