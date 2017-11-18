import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  url: string = "https://homelegance-kiosk.herokuapp.com"
  pages:number = 0;
  constructor(private http: HttpClient) { }

  getProducts(category, pageNumber) {
    let products = [];
    return this.http.get<Product[]>(this.url + category + "/" + pageNumber);
  }

  getPageNumbers(category) {
    return this.http.get(this.url + category)
  }
}
