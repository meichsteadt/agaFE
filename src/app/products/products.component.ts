import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  products = [];
  productPages = [];
  user;
  category: string;
  pageNumber: number = 1;
  pages: number = 0;
  search: boolean = false;
  searchParams: string;
  noProducts: boolean = false;
  startingPosition: number = 0;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private auth: AuthService, private productService: ProductService, private userService: UserService ) { }

  ngOnInit() {
    this.closeModal();
    this.category = this.router.url.split('/').pop();
    this.user = this.userService.getUser();

    this.route.params.subscribe(params => {
      if(params['search']) {
        this.searchParams = params['search']
        this.search = true;
        this.checkPageNumber(this.searchParams);
        this.setPage(this.pageNumber);
        this.getSearchProducts(this.searchParams);
      }
      else {
        params['category']? this.category = params['category'] : false
        this.checkPageNumber(this.category);
        this.setPage(this.pageNumber);
        this.getAllProducts(this.category);
      }
    });
  }

  checkProductsLength(){
    if(!this.products || this.products.length < 1) {
      this.noProducts = true;
    }
    else {
      this.noProducts = false;
    }
  }

  getSearchProducts(search) {
    this.productService.search(search, this.auth.getUser(), 1).subscribe(response => {
      this.products = [];
      this.pages = Math.ceil(response["pages"]/6);
      for(var i = 0; i< this.pages; i ++) {
        this.products.push([])
        this.productService.search(search, this.auth.getUser(), i + 1).subscribe(response => {
          this.products[parseInt(response["page_number"]) - 1] = response["products"]
        })
      }
      this.checkProductsLength();
    })
  }

  checkPageNumber(category) {
    if(category !== localStorage.getItem("category")) {
      localStorage.setItem("pageNumber", "1")
      localStorage.setItem("category", category);
    }
    if(localStorage.getItem("pageNumber")) {
      this.pageNumber = parseInt(localStorage.getItem("pageNumber"));
      this.startingPosition = this.pageNumber - 1;
    }
  }

  getProducts(category, pagenumber) {
    if(this.router.url.split('/')[2] == 'sub-categories') {
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
    if (number === this.pageNumber) {
      return true
    }
  }

  setPage(number) {
    this.pageNumber = number;
    localStorage.setItem("pageNumber", this.pageNumber + "");
  }

  nextPage() {
    if (this.pageNumber == this.pages) {
      this.setPage(1);
    }
    else {
      this.setPage(this.pageNumber + 1);
    }
  }

  previousPage() {
    if (this.pageNumber == 1) {
      this.setPage(this.pages);
    }
    else {
      this.setPage(this.pageNumber -= 1)
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

  getAllProducts(category) {
    if(this.router.url.split('/')[2] == 'sub-categories') {
      this.productService.getProductsFromSubCategory(category, 1, this.auth.getUser()).subscribe(response => {
        this.pages = Math.ceil(response["pages"]/6);
        for(var i = 0; i < this.pages; i++) {
          this.products.push([])
          this.productService.getProductsFromSubCategory(category, i + 1, this.auth.getUser()).subscribe(response => {
            this.products[parseInt(response['page_number']) - 1] = response["products"];
          })
        }
      }, error => this.catchError(error));
    }
    else {
      this.productService.getProducts(category, 1, this.auth.getUser()).subscribe(response => {
        this.pages = Math.ceil(response["pages"]/6);
        for(var i = 0; i < this.pages; i ++) {
          this.products.push([]);
          this.productService.getProducts(category, i + 1, this.auth.getUser()).subscribe(response => {
            this.products[parseInt(response['page_number']) - 1] = response["products"];
          })
        }
      }, error => this.catchError(error));
    }
  }

  active(i) {
    if(i === this.startingPosition) {
      return true
    }
    else {
      return false
    }
  }


  catchError(error) {
    console.log(error)
  }
}
