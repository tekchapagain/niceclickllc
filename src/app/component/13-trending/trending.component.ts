import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  products: Product[] = []
  customOptions: any;

  constructor(private productService: ProductService) {
    this.customOptions = {
      loop: false,
      margin: 10,
      dot:false,
      nav: true,
      navText:[
        '<button type="button" class="custom-prev"><i class="icon-angle-left"></i></button>', // Custom previous button
        '<button type="button" class="custom-next"><i class="icon-angle-right"></i></button>' // Right Arrow
      ],
      responsive: {
        0: {
            items:2
        },
        480: {
            items:2
        },
        768: {
            items:4
        },
        992: {
            items:4
        }
    }
    };
  }
  
  ngOnInit(): void {
      this.productService.getTrending().subscribe((data:any)=>this.products = data.data)
    
    }
}
