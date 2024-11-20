import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }


  getShopProducts(page: string, categories: string[] | string, price: number | null) {
    let path = `products?page=${page}`;
    const params: string[] = [];
  
    // Handle categories parameter
    if (Array.isArray(categories) && categories.length > 0) {
      params.push(...categories.map(item => `category[]=${encodeURIComponent(item.toString())}`));
    } else if (typeof categories === 'string' && categories.length > 0) {
      params.push(`category[]=${encodeURIComponent(categories)}`);
    }
  
    // Handle price parameter
    if (price !== null && price > 0) {
      params.push(`price=${price}`);
    }
  
    // If there are any parameters, join them with '&' and append to the path
    if (params.length > 0) {
      path += `&${params.join('&')}`;
    }
  
    return this.httpClient.get(`${environment.apiUrl}${path}`);
  }

  getNewArrivals() {
    return this.httpClient.get(`${environment.apiUrl}products/new-arrivals`)
  }

  getRecommended() {
    return this.httpClient.get(`${environment.apiUrl}products/recommended`)
  }

  getTrending() {
    return this.httpClient.get(`${environment.apiUrl}products/trending`)
  }

  getProducts() {
    return this.httpClient.get(`${environment.apiUrl}products`)
  }
  
  getAllProducts() {
    return this.httpClient.get(`${environment.apiUrl}products/all`)
  }
  
  getProductsById(id:number) {
    return this.httpClient.get(`${environment.apiUrl}products/${id}`)
  }
  getProductByCategoryId(category_id:number){
    return this.httpClient.get(`${environment.apiUrl}categories/${category_id}/products`)
  }

   searchProducts(query: string = '', page: number = 1, pageSize: number = 5): Observable<any> {
    let params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.httpClient.get<any>(`${environment.apiUrl}products/search`, { params });
  }

}
