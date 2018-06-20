import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css'],
  providers: [AuthService, ProductService]
})
export class NewArrivalsComponent implements OnInit {
  user: string;
  category: string;
  subCategories = [];
  pagenumber: number = 1;
  pages: number;
  startingPosition: number = 0;
  products = [];
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private auth: AuthService) { }

  ngOnInit() {
    let user = this.auth.getUser();
    this.user = user;
    this.getNewArrivals();
  }

  goToDetail(clickedProduct) {
    this.router.navigate(['products', clickedProduct["id"]])
  }

  getNewArrivals() {
    this.productService.getNewArrivals(this.user, this.pagenumber).subscribe(response => {
      this.pages = Math.ceil((response["pages"] + 1) / 6)
      for(var i = 0; i < this.pages; i++) {
        this.products.push([])
        this.productService.getNewArrivals(this.user, i + 1).subscribe(res => {
          this.products[parseInt(res["page_number"]) - 1] = res["products"];
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
}
