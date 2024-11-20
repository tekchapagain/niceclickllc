import { Component } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { productNav } from 'src/app/interface/productNav';
import { ProductService } from 'src/app/service/product/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from 'src/app/service/category/category.service';
import { Category } from 'src/app/interface/category';
import { ColorService } from 'src/app/service/color/color.service';
import { Color } from 'src/app/interface/color';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent {
  products: Product[] = [];
  categories: Category[] = [];
  colors: Color[] = [];
  nav: productNav = {} as productNav;
  page: any;
  apiUrl: string = environment.apiUrl;
  selectedColors: any;
  selectedCategories: { [key: number]: boolean } = {};
  maxPrice:number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
      this.page = params['page'] || '1';
  
      // Check for color and category parameters
      this.selectedColors = params['color'] || '';
      this.maxPrice = parseFloat(params['price']) || 0;
  
      // Initialize selectedCategories properly
      const categoriesParam = params['category'];
      if (categoriesParam) {
        // Assuming category IDs are passed as a comma-separated string
        this.selectedCategories = {};
        categoriesParam.split(',').forEach((id: string) => {
          this.selectedCategories[+id] = true; // Mark as selected
        });
      } else {
        this.selectedCategories = {}; // Reset to empty if no categories are selected
      }

      
      this.productService
        .getShopProducts(
          this.page,
          Object.keys(this.selectedCategories).filter(key => this.selectedCategories[+key]),
          this.maxPrice
        )
        .subscribe((data: any) => {
          this.products = data.data;
          this.nav.current_page = data.current_page;
          this.nav.first_page_url = data.first_page_url;
          this.nav.from = data.from;
          this.nav.last_page = data.last_page;
          this.nav.last_page_url = data.last_page_url;
          this.nav.pre_next_links = [
            data.links[0],
            data.links[data.links.length - 1],
          ].map((item: any) => {
            item.url = decodeURIComponent(item.url).replaceAll(
              /\[[0-9]\]/g,
              ''
            );
            return item;
          });
          this.nav.num_links = data.links
            .slice(1, data.links.length - 1)
            .map((item: any) => {
                // Avoid manipulating the URL if it's not necessary
                if (item.url) {
                  // If URL is valid, clean it up, but don't decode it
                  item.url = item.url.replace(/\[[0-9]\]/g, ''); // Clean up any array indices in the URL
                }
                return item;
            });
          this.nav.next_page_url = data.next_page_url;
          this.nav.path = data.path;
          this.nav.per_page = data.per_page;
          this.nav.prev_page_url = data.prev_page_url;
          this.nav.to = data.to;
          this.nav.total = data.total;
        });
      
    });

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;

    });

    // this.colorService.getColors().subscribe((data: any) => {
    //   this.colors = data;
    // });
  }
  getPageParams(url: string | null): any {
    if (!url || !url.includes('?')) {
      return {};  // Return empty params if URL is invalid or doesn't contain query params
    }
    
    const queryParams = url.split('?')[1];
    const params = new URLSearchParams(queryParams);
    let result: any = {};
  
    params.forEach((value, key) => {
      result[key] = value;
    });
  
    return result;  // Return an object of query params
  }

  onFilterSubmit(): void {
    // Get selected categories as an array of category IDs
    const selectedCategoriesArray = Object.keys(this.selectedCategories)
      .filter(key => this.selectedCategories[+key]) // Filter for selected categories
      .map(key => key.toString()); // Convert keys to strings
  
    // Debugging: Log the selectedCategoriesArray to see what it contains
    console.log('Selected Categories Array:', selectedCategoriesArray);
  
    const price = this.maxPrice > 0 ? this.maxPrice : null; // Set price to null if not specified
  
    // Fetch products with both selected categories and price
    this.productService.getShopProducts('1', selectedCategoriesArray, price).subscribe((data: any) => {
      this.products = data.data;
      // Update pagination nav based on response
      this.updateNavigation(data);
    });
  }
  
  // Method to update navigation object after fetching products
  private updateNavigation(data: any): void {
    this.nav.current_page = data.current_page;
    this.nav.first_page_url = data.first_page_url;
    this.nav.from = data.from;
    this.nav.last_page = data.last_page;
    this.nav.last_page_url = data.last_page_url;
    this.nav.next_page_url = data.next_page_url;
    this.nav.path = data.path;
    this.nav.per_page = data.per_page;
    this.nav.prev_page_url = data.prev_page_url;
    this.nav.to = data.to;
    this.nav.total = data.total;
  
    // Clean up nav.links and prepare for pagination
    this.nav.pre_next_links = [
      data.links[0],
      data.links[data.links.length - 1],
    ].map((item: any) => {
      item.url = decodeURIComponent(item.url).replaceAll(/\[[0-9]\]/g, '');
      return item;
    });
  
    this.nav.num_links = data.links.slice(1, data.links.length - 1).map((item: any) => {
      if (item.url) {
        item.url = item.url.replace(/\[[0-9]\]/g, ''); // Clean URL
      }
      return item;
    });
  }

  clearFilters(): void {
    this.selectedCategories = {};
    this.maxPrice = 0;
  
    // Reset to page 1 after clearing filters
    this.page = '1';
  }
  
}
