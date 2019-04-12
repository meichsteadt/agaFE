import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductItem } from '../product-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

declare var $:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, UserService]
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
  showSku: boolean = false;
  showPrices: boolean = true;
  bodyWidth: number;
  thWidth: number;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private auth: AuthService, private productService: ProductService, private userService: UserService) { }

  ngOnInit() {
    let user = this.auth.getUser();
    this.user = user;
    this.userService.getShowSettings(user).subscribe((response: boolean) => {
      this.showSku = response["show_sku"];
      this.showPrices = response["show_prices"];
    });
    this.route.params.subscribe((urlParameters) => {
      this.productId = parseInt(urlParameters['id']);
      this.getProduct(user);
    });
    this.setTotal();

    this.bodyWidth = Math.round($('body').width());
    this.thWidth = Math.round($('.product-image-wrapper').width());
  }

  getProduct(user) {
    this.productItems = [];
    this.productService.getProduct(this.productId, this.user).subscribe(i =>
      {
        let thumbnail = i["product"]["images"][0];
        if(thumbnail && thumbnail.match("500x500")) {
          thumbnail = thumbnail.replace("500x500", this.thWidth + "x" + this.thWidth)
        }
        this.product = new Product(i["product"]["id"], i["product"]["category"], i["product"]["description"], i["product"]["name"], i["product"]["number"], thumbnail);
        for(var j = 0; j < i["product"]["images"].length; j ++) {
          if(i["product"]["images"][j].match("500x500")) {
            this.images.push(i["product"]["images"][j].replace("500x500", this.bodyWidth + "x" + this.bodyWidth))
          }
          else {
            this.images.push(i["product"]["images"][j])
          }
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
    if(this.productId < 4785) {
      this.router.navigateByUrl('products/' + (this.productId + 1) + "?user=19")
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

  catchError(error) {
    this.next();
    // this.auth.resetToken();
  }
}
