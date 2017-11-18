import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductItem } from '../product-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

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
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    let user = this.auth.getUser();
    this.user = user;
    this.route.params.subscribe((urlParameters) => {
      this.productId = parseInt(urlParameters['id']);
      this.getProduct(user);
    });
    this.setTotal();
  }

  getProduct(user) {
    this.productItems = [];
    this.http.get("https://homelegance-kiosk.herokuapp.com/users/"+ user +"/products/" + this.productId).subscribe(i =>
      {
        this.product = new Product(i["product"]["id"], i["product"]["category"], i["product"]["description"], i["product"]["name"], i["product"]["number"], i["product"]["images"][0]);
        this.images = i["product"]["images"]
      }
    , error => this.catchError(error));
    this.http.get("https://homelegance-kiosk.herokuapp.com/users/"+ user +"/products/" + this.productId).subscribe(i => i["product_items"].forEach(item => {
      let productItem = new ProductItem(item["description"], item["dimensions"], item["id"], item["number"], item["price"], 0)
      this.productItems.push(productItem)
    }));
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
    this.http.post("https://homelegance-kiosk.herokuapp.com/emails/", {"email_address": email, "product_id": this.productId, "user_id": this.user}).subscribe(res => console.log(res));
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

  catchError(error) {
    this.auth.resetToken();
  }
}
