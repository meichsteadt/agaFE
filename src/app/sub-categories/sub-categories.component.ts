import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'jquery'
import * as carousel from 'bootstrap/js/carousel.js';
declare var ahoy: any;
declare var $: any;

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
  providers: [AuthService, ProductService]
})
export class SubCategoriesComponent implements OnInit {
  user: string;
  category: string;
  subCategories = [];
  pagenumber: number = 1;
  pages: number;
  startingPosition: number = 0;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private auth: AuthService) { }

  ngOnInit() {
    let user = this.auth.getUser();
    this.user = user;
    this.route.params.subscribe((urlParameters) => {
      this.category = urlParameters['category'];
    });
    this.getSubCategories();
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

  getSubCategories() {
    this.productService.getSubCategories(this.category, this.pagenumber).subscribe(response => {
      this.pages = Math.ceil((response["pages"] + 1) / 6)
      for(var i = 0; i < this.pages; i++) {
        this.subCategories.push([])
        this.productService.getSubCategories(this.category, i + 1).subscribe(res => {
          this.subCategories[parseInt(res["page_number"]) - 1] = res["sub_categories"];
        })
      }
    });
  }

  setPage(pagenumber){
    this.pagenumber = pagenumber;
  }

  nextPage() {
    if (this.pagenumber == this.pages) {
      this.setPage(1);
    }
    else {
      this.setPage(this.pagenumber + 1);
    }
  }

  previousPage() {
    if (this.pagenumber == 1) {
      this.setPage(this.pages);
    }
    else {
      this.setPage(this.pagenumber -= 1)
    }
  }

  compare(number) {
    if (number == this.pagenumber) {
      return "active"
    }
  }

  createRange(number) {
    let arr = []
    for(let i = 1; i <= number; i ++) {
      arr.push(i)
    }
    return arr;
  }

  active(i) {
    if(i === this.startingPosition) {
      return true
    }
    else {
      return false
    }
  }

  getSubCategoryThumbnails(category) {
    return this.productService.getSubCategoryThumbnails(category)
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    }

    else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 && Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        if(swipe === "next") {
          this.nextPage();
          $('#myCarousel').carousel('next');
        }
        else {
          this.previousPage();
          $('#myCarousel').carousel('prev');
        }
      }
    }
  }
}
