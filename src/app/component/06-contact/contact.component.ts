import { Component } from '@angular/core';
import { ContactService } from 'src/app/service/contact/contact.service';
import { Contact } from 'src/app/interface/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact: Contact = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  constructor(private contactService: ContactService) {}

  onSubmit(): void {
    this.contactService.sendContactForm(this.contact).subscribe(
      (response) => {
        alert('Form submitted successfully!');
        // Optionally, reset the form or handle further response logic
      },
      (error) => {
        console.error('There was an error!', error);
        alert('Failed to submit the form.');
      }
    );
  }
}
