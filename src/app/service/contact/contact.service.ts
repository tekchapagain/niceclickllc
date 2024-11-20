import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/interface/contact';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
    constructor(private httpClient:HttpClient) { }

  sendContactForm(contact: Contact): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}contact/`, contact)
  }
}
