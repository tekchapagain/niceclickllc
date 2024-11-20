import { Component,Input,OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent implements OnInit {

  products: Product[] = [];
  isLoading: boolean = true;
  customOptions: any;

  constructor(private productService: ProductService) {
    this.customOptions = {
      loop: true,
      margin: 10,
      nav: true,
      navText:[
        '<i class="icon-angle-left"></i>', // Left Arrow
        '<i class="icon-angle-right"></i>' // Right Arrow
      ],
      responsive: {
        0: {
          items: 1
        },
        220: {
          items: 2
        },
        1000: {
          items: 5
        }
      }
    };
  }

  ngOnInit(): void {
    this.productService.getNewArrivals().subscribe(
      (data: any) => {
        this.products = data;
        this.isLoading = false; // Stop loading once data is fetched
      },
      (error: any) => {
        console.error('Error fetching new arrivals:', error);
        this.isLoading = false; // Stop loading on error as well
      }
    );
  }
  
}
