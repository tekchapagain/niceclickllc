import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { Product } from 'src/app/interface/product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  searchQuery: string = '';
  products: Product[] = [];
  nav: any;

  constructor(private productService: ProductService ,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
      this.searchQuery = params['q'];
      this.searchProducts();
    });
  }


  searchProducts(): void {
    if (this.searchQuery) {
      this.productService.searchProducts(this.searchQuery).subscribe(
        (data: any) => {
          this.products = data.data; 
          // Adjust according to your API response
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  getPageParams(url: string | null): any {
    if (!url) return {};

    const urlObj = new URL(url);
    const params: any = {};

    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  }
  }
