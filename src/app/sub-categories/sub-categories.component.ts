import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

declare var $: any;
declare var M: any;


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
  timesLooped:number = 0;
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
  }

  nextPage() {
    $('.carousel').carousel('next')
  }

  previousPage() {
    $('.carousel').carousel('prev')
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
        numVisible: this.pages,
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
}
