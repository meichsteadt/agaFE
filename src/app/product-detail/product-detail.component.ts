import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductItem } from '../product-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  productId: number = null;
  productItems: ProductItem[] = [];
  total: number;
  email: string = "";
  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    let user = this.auth.getUser();
    this.route.params.forEach((urlParameters) => {
      this.productId = parseInt(urlParameters['id']);
    });
    this.http.get("http://localhost:3000/users/"+ user +"/products/" + this.productId).subscribe(i => this.product = new Product(i["product"]["id"], i["product"]["category"], i["product"]["description"], i["product"]["name"], i["product"]["number"], i["product"]["image"]));
    this.http.get("http://localhost:3000/users/"+ user +"/products/" + this.productId).subscribe(i => i["product_items"].forEach(item => {
      let productItem = new ProductItem(item["description"], item["dimensions"], item["id"], item["number"], item["price"], 0)
      this.productItems.push(productItem)
    }));
    this.setTotal();
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
    this.http.post("http://localhost:3000/emails/", {"email_address": email, "product_id": this.productId, "user_id": 1}).subscribe();
    document.getElementById("email-form").style.display = "none";
    document.getElementById("email-confirmation").style.display = "block";
  }
}
