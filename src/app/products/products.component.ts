import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

declare var $: any;
declare var M: any;


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
  pageNumber: number = 0;
  previousPageNumber: number = null;
  pages: number = 0;
  search: boolean = false;
  searchParams: string;
  noProducts: boolean = false;
  startingPosition: number = 0;
  displayed: Number[] = [0, 1, 2];
  timesLooped:number = 0;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private auth: AuthService, private productService: ProductService, private userService: UserService ) { }

  ngOnInit() {
    $(function() {
      $('.sidenav').sidenav('close');
    })

    this.category = window.location.pathname.split('/').pop();
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
          if(this.timesLooped === this.pages - 1) {
            this.initCarousel();
          }
          else {
            this.timesLooped++;
          }
        })
      }
      this.checkProductsLength();
    })
  }

  checkPageNumber(category) {
    if(category !== localStorage.getItem("category")) {
      localStorage.setItem("pageNumber", "0")
      localStorage.setItem("category", category);
    }
    if(localStorage.getItem("pageNumber")) {
      this.pageNumber = parseInt(localStorage.getItem("pageNumber"));
      this.startingPosition = this.pageNumber;
    }
  }

  getProducts(category, pagenumber) {
    if(window.location.pathname.split('/')[2] == 'sub-categories') {
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

    this.initCarousel();
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
    this.previousPageNumber = this.pageNumber;
    this.pageNumber = number;
    localStorage.setItem("pageNumber", this.pageNumber + "");
  }

  nextPage() {
    $('.carousel').carousel('next')
    if (this.pageNumber == this.pages) {
      this.setPage(1);
    }
    else {
      this.setPage(this.pageNumber + 1);
    }
  }

  previousPage() {
    $('.carousel').carousel('prev')
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
    if(window.location.pathname.split('/')[2] == 'sub-categories') {
      this.productService.getProductsFromSubCategory(category, 1, this.auth.getUser()).subscribe(response => {
        this.pages = Math.ceil(response["pages"]/6);
        for(var i = 0; i < this.pages; i++) {
          this.products.push([])
          this.productService.getProductsFromSubCategory(category, i + 1, this.auth.getUser()).subscribe(response => {
            this.products[parseInt(response['page_number']) - 1] = response["products"];
            if(this.timesLooped === this.pages - 1) {
              this.initCarousel();
            }
            else {
              this.timesLooped++;
            }
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
            if(this.timesLooped === this.pages - 1) {
              this.initCarousel();
            }
            else {
              this.timesLooped++;
            }
          })
        }
      }, error => this.catchError(error));
    }
  }

  shouldDisplay(i) {
    if(
      i === this.pageNumber ||
      i === this.pageNumber + 1 ||
      i === this.pageNumber + 2 ||
      this.displayed.includes(i) ||
      i === (this.pages + this.pageNumber) ||
      i === (this.pages + this.pageNumber - 1)
    ) {
      if(!this.displayed.includes(i)) {
        this.displayed.push(i);
      }
      return true;
    }
    else {
      return false
    }
  }

  initCarousel() {
    $(document).ready(doc => {
      $('.carousel-inner').remove()
      $('.indicators').remove()
      var instance = M.Carousel.getInstance(document.querySelector('.carousel'));
      if(instance) {
        instance.destroy();
      }
      var elem = document.querySelector('.carousel');
      var new_instance = M.Carousel.init(elem, {
        indicators: true,
        fullWidth: true,
        numVisible: this.pages,
        duration: 0
      })
      new_instance.set(this.startingPosition)
      new_instance.options.onCycleTo = (i => {
        this.setPage(new_instance.center);
      })
      setTimeout(time => {
        new_instance.options.duration = 200;
      }, 200)
    })
  }

  catchError(error) {
    console.log(error)
  }
}
