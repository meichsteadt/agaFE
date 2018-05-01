import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductItem } from '../product-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

import 'ahoy.js';
declare var ahoy: any;
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  productId: number = null;
  productItems: ProductItem[] = [];
  total: number;
  email: string = "";
  images: String[] = [];
  currentImage: number = 0;
  user: string;
  ready: boolean = false;
  activeImage: number = 0;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private auth: AuthService, private productService: ProductService) { }

  ngOnInit() {
    let user = this.auth.getUser();
    this.user = user;
    this.route.params.subscribe((urlParameters) => {
      this.productId = parseInt(urlParameters['id']);
      this.getProduct(user);
      var elem = document.querySelector('.modal');
      var modal = M.Modal.init(elem, {endingTop: "1%"});
    });
    this.setTotal();
    // ahoy.trackView();
  }

  getProduct(user) {
    this.productItems = [];
    this.productService.getProduct(this.productId, this.user).subscribe(i =>
      {
        this.product = new Product(i["product"]["id"], i["product"]["category"], i["product"]["description"], i["product"]["name"], i["product"]["number"], i["product"]["images"][0]);
        for(var j = 0; j < i["product"]["images"].length; j ++) {
          this.images.push(i["product"]["images"][j]);
        }
        i["product_items"].forEach(item => {
          let productItem = new ProductItem(item["description"], item["dimensions"], item["id"], item["number"], item["price"], 0, item["can_sell"])
          this.productItems.push(productItem);
        })
      }
    , error => this.catchError(error));
    }

  dropDown(event, item) {
    let element = event.srcElement.parentElement.children[1];
    element.className = "active";

    function clickEvent() {
      element.className = "";
      document.body.removeEventListener("click", clickEvent);
    }

    setTimeout(function() {
      document.body.addEventListener("click", clickEvent);
    }, 0)

  }

  selectNumber(event, item) {
    let value = event.srcElement.value;
    item.numberSelected = value;
    event.srcElement.parentElement.className = "";
    this.setTotal();
  }

  setTotal() {
    let sum = 0;
    if (this.productItems.length > 0) {
      this.productItems.forEach(function(item) {
        sum += item.price * item.numberSelected;
      })
    }
    this.total = sum;
  }

  sendEmail(email) {
    this.productService.sendEmail(email, this.user, this.productId).subscribe();
    document.getElementById("email-form").style.display = "none";
    document.getElementById("email-confirmation").style.display = "block";
  }

  next() {
    if(this.productId !== 4272) {
      this.router.navigateByUrl('products/' + (this.productId + 1))
    }
  }

  active(i) {
    if(i == 0) {
      return true
    }
    else {
      return false
    }
  }

  multipleImages() {
    if(this.images.length > 1) {
      return true
    }
    else {
      return false
    }
  }

  initCarousel() {
    $(i => {
      var elem = document.querySelector('.carousel');
      var currentInstance = M.Carousel.getInstance(elem);
      if(!currentInstance) {
        var options = {fullWidth: true, indicators: true, noWrap: true}
        var instance = M.Carousel.init(elem, options);
      }
    })
  }

  openModal() {
    var elem = document.querySelector('.modal');
    var instance = M.Modal.getInstance(elem);
    instance.open();
    this.initCarousel();
  }

  catchError(error) {
    // this.auth.resetToken();
  }

}
