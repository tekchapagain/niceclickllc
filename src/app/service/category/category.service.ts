import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

  getCategories():any{
     return this.httpClient.get(`${environment.apiUrl}categories`)
  }

  getCategoryById(id:number){
    return this.httpClient.get(`${environment.apiUrl}categories/${id}`)
  }
}
