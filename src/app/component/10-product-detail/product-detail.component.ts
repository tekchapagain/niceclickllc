import { Component, ViewChild , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductService } from 'src/app/service/product/product.service';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  id:number = 0;
  product:Product = {} as Product;
  products:Product[] = [];
  descriptionHtml!: SafeHtml;
  selectedImage: string = ''; 
  currentImageSrc: string = ''; // Start with the main image
  activeIndex: number = 0; 
  @ViewChild('fullscreenImage') fullscreenImageComponent!: any;

  constructor(private route:ActivatedRoute, 
  private productService:ProductService, 
  private storageService:StorageService,
  private sanitizer: DomSanitizer
  
  ){

  }

  ngOnInit() :void{

    this.selectedImage = this.product.image;
    this.currentImageSrc = this.product.image;
        
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.productService.getProductsById(this.id).subscribe((data:any)=>{
      this.product = data;
      this.descriptionHtml = this.sanitizer.bypassSecurityTrustHtml(this.product.description);

    this.productService.getProductByCategoryId(this.product.category.id).subscribe((data:any)=> {
      this.products = data.data;
      this.descriptionHtml = this.sanitizer.bypassSecurityTrustHtml(this.product.description);
      });
    });

  }

  addProductToCart(){
    this.storageService.addProducts(this.product, 1);
  }

  incQuantity(i:number){
  }

  decQuantity(i:number){
  }

  getRelativeTime(dateString: string): string {
    const date = new Date(dateString); // Parse the ISO date string
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return `${weeks} weeks ago`;
  }

  selectImage(image: string, event: Event) {
    event.preventDefault();
    this.selectedImage = image;
    this.currentImageSrc = image;
  }
  
  openFullscreen() {
    this.currentImageSrc = this.product.image; // Set the current image source
    this.fullscreenImageComponent.open(); // Open the fullscreen overlay
  }
}