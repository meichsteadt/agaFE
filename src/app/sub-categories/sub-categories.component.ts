import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'ahoy.js';
declare var ahoy: any;

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
  providers: [AuthService, ProductService]
})
export class SubCategoriesComponent implements OnInit {
  user: string;
  category: string;
  subCategories;
  pagenumber: number = 1;
  pages: number;
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private auth: AuthService) { }

  ngOnInit() {
    let user = this.auth.getUser();
    this.user = user;
    this.route.params.subscribe((urlParameters) => {
      this.category = urlParameters['category'];
    });
    this.setPage(this.pagenumber);
    if (this.user !== "1") {
      ahoy.trackView();
    }
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
      this.subCategories = response["sub_categories"];
      if(!this.pages) {
        this.pages = Math.ceil((response["pages"] + 1) / 6)
      }
    });
  }

  setPage(pagenumber){
    this.pagenumber = pagenumber;
    this.getSubCategories();
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

  getSubCategoryThumbnails(category) {
    return this.productService.getSubCategoryThumbnails(category)
  }
}
