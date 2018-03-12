import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { isDevMode } from '@angular/core';
import { backendConfig } from './api-keys';

@Injectable()
export class ProductService {
  // url: string = "https://homelegance-kiosk.herokuapp.com"
  pages:number = 0;
  constructor(private http: HttpClient) { }

  getProducts(category, pageNumber, user) {
    let products = [];
    return this.http.get<Product[]>(this.url() + "/users/" + user + "/" + category + "/" + pageNumber);
  }

  getPageNumbers(category) {
    return this.http.get(this.url() + "/" + category)
  }

  url() {
    return isDevMode()? backendConfig.testUrl : backendConfig.url;
  }

  getProduct(id, user) {
    return this.http.get(this.url() + "/users/" + user + "/products/" + id)
  }

  getSubCategories(category, pagenumber) {
    return this.http.get(this.url() + "/sub_categories/" + category + "?page_number=" + pagenumber)
  }

  getProductsFromSubCategory(subCategory, pageNumber, user) {
    return this.http.get(this.url() + "/users/" + user + "/products?sub_category=" + this.paramize(subCategory) + "&page_number=" + pageNumber)
  }

  paramize(string) {
    if (string == "beds-headboards" || string == "buffets-hutches"){
      return string.replace(/-/g, '/');
    }
    return string.replace(/-/g, ' ');
  }

  search(search, user = null, pagenumber) {
    if(user) {
      return this.http.get(this.url() + "/searches?search=" + search + "&user_id=" + user + "&page_number=" + pagenumber)
    }
    else {
      return this.http.get(this.url() + "/searches?search=" + search)
    }
  }

  getAllSubCategories() {
    return this.http.get<any>(this.url() + "/sub_categories")
  }

  getSubCategoryThumbnails(category) {
    var image;
    switch(category) {
      case "dining":
        image = "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/1372-78.jpg";
        break;
      case "bedroom":
        image = "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/1907.jpg";
        break;
      case "seating":
        image = "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/8413GY_all_mixing+color+(2015).jpg";
        break;
      case "youth":
        image = "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/B2043FF-1.jpg";
        break;
      case "occasional":
        image = "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/5267RF-30.jpg";
        break;
      case "home":
        image = "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/3224N.jpg";
        break;
    }
    return image;
  }

  sendEmail(email, user, productId) {
    return this.http.post(this.url() + "/emails/", {"email_address": email, "product_id": productId, "user_id": user})
  }

  getNewArrivals(user, pageNumber) {
    return this.http.get(this.url() + "/users/" + user + "/new_arrivals" + "?page_number=" + pageNumber)
  }
}
