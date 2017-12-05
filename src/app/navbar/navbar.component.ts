import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ProductService]
})
export class NavbarComponent implements OnInit {
  navSubCategories;
  constructor(private router: Router, private _location: Location, private productService: ProductService) { }

  ngOnInit() {
    this.getSubCategories();
  }

  goBack() {
    this._location.back();
  }

  getSubCategories() {
    let categories = {};
    this.productService.getAllSubCategories().subscribe(response => {
      response.forEach(function(subCategory) {
        if(categories[subCategory["parent_category"]]) {
          categories[subCategory["parent_category"]].push(subCategory);
        }
        else {
          categories[subCategory["parent_category"]] = [];
          categories[subCategory["parent_category"]].push(subCategory);
        }
      })
    })
    this.navSubCategories = categories;
  }

  generateArray(obj) {
    let arr = []
    for(let key in obj) {
      let arr2 = [key, obj[key]]
      arr.push(arr2)
    }
    return arr
  }

  closeNav() {
    document.getElementById('nav-bar').style.right = "-100%";
    document.getElementsByTagName('body')[0].style.overflowY = "visible";
    document.getElementById('overlay').style.display = "none";
  }

  openNav() {
    document.getElementsByTagName('body')[0].style.overflowY = "visible";
    document.getElementById('nav-bar').style.right = "0";
    document.getElementById('overlay').style.display = "block";
  }

  linkize(string) {
    if(string) {
      var strings = string.split(" ")
      var link = "";
      for(var i = 0; i < strings.length; i ++){
        var word = "";
        for(var j = 0; j < strings[i].length; j++) {
          word+= strings[i][j].toLowerCase();
        }
        if(i !== strings.length - 1) {
          word+="-"
        }
        link+=word;
      }
      return link.replace("/", "-")
    }
  }

  goTo(subCategory) {
    this.router.navigate(["/products/sub-categories/" + this.linkize(subCategory)])
  }
}
