import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {
  title = "CodeSandbox";
  public slidesStore: any[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    margin:10,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.slidesStore = new Array(5).fill(null).map((_, i) => ({
      id: `${i + 1}`,
      src: this.sanitizer.bypassSecurityTrustResourceUrl(
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
      ),
      alt: `img${i + 1}`,
      title: `imgTitle${i + 1}`
    }));
  }
}
