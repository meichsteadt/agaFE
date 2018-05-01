import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

declare var $: any;
declare var M: any;

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
  pagenumber: number = 0;
  pages: number;
  startingPosition: number = 0;
  products = [];
  timesLooped: number = 0;
  displayed: Number[] = [0,1,2];
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private auth: AuthService) { }

  ngOnInit() {
    let user = this.auth.getUser();
    this.user = user;
    this.checkPageNumber("newArrivals");
    this.getNewArrivals();
  }

  goToDetail(clickedProduct) {
    this.router.navigate(['products', clickedProduct["id"]])
  }

  checkPageNumber(category) {
    if(category !== localStorage.getItem("category")) {
      localStorage.setItem("pageNumber", "1")
      localStorage.setItem("category", category);
    }
    if(localStorage.getItem("pageNumber")) {
      this.pagenumber = parseInt(localStorage.getItem("pageNumber"));
      this.startingPosition = this.pagenumber - 1;
    }
  }

  getNewArrivals() {
    this.productService.getNewArrivals(this.user, this.pagenumber).subscribe(response => {
      this.pages = Math.ceil((response["pages"] + 1) / 6)
      for(var i = 0; i < this.pages; i++) {
        this.products.push([])
        this.productService.getNewArrivals(this.user, i + 1).subscribe(res => {
          this.products[parseInt(res["page_number"]) - 1] = res["products"];
          if(this.timesLooped === this.pages - 1) {
            this.initCarousel();
          }
          else {
            this.timesLooped++;
          }
        })
      }
    });
  }

  setPage(pagenumber){
    this.pagenumber = pagenumber;
    localStorage.setItem("pageNumber", this.pagenumber + "");
  }

  nextPage() {
    $('.carousel').carousel('next')
    if (this.pagenumber == this.pages) {
      this.setPage(1);
    }
    else {
      this.setPage(this.pagenumber + 1);
    }
  }

  previousPage() {
    $('.carousel').carousel('prev')
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

  shouldDisplay(i) {
    if(
      i === this.pagenumber ||
      i === this.pagenumber + 1 ||
      i === this.pagenumber + 2 ||
      this.displayed.includes(i) ||
      i === (this.pages + this.pagenumber) ||
      i === (this.pages + this.pagenumber - 1)
    ) {
      if(!this.displayed.includes(i)) {
        this.displayed.push(i);
      }
      return true;
    }
    else {
      return false
    }
  }

  initCarousel() {
    $(document).ready(doc => {
      $('.carousel-inner').remove()
      $('.indicators').remove()
      var instance = M.Carousel.getInstance(document.querySelector('.carousel'));
      if(instance) {
        instance.destroy();
      }
      var elem = document.querySelector('.carousel');
      var new_instance = M.Carousel.init(elem, {
        indicators: true,
        fullWidth: true,
        duration: 0
      })
      new_instance.set(this.startingPosition)
      new_instance.options.onCycleTo = (i => {
        this.setPage(new_instance.center);
      })
      setTimeout(time => {
        new_instance.options.duration = 200;
      }, 200)
    })
  }

  getSubCategoryThumbnails(category) {
    return this.productService.getSubCategoryThumbnails(category)
  }
}
