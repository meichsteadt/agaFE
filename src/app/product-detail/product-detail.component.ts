import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductItem } from '../product-item.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  productId: number = null;
  productItems: ProductItem[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.productId = parseInt(urlParameters['id']);
    });
    this.http.get("http://localhost:3000/products/" + this.productId).subscribe(i => this.product = new Product(i["product"]["id"], i["product"]["category"], i["product"]["description"], i["product"]["name"], i["product"]["number"], i["product"]["image"]));
    this.http.get("http://localhost:3000/products/" + this.productId).subscribe(i => i["product_items"].forEach(item => {
      let productItem = new ProductItem(item["description"], item["dimensions"], item["id"], item["number"], item["price"])
      this.productItems.push(productItem)
    }));
  }

}
