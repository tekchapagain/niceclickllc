import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.css']
})
export class FullscreenImageComponent {
  @Input() imageSrc!: string; // Input property for image source
  isOpen = false; // State to manage the overlay visibility

  // Method to open the overlay
  open() {
    this.isOpen = true;
  }

  // Method to close the overlay
  close() {
    this.isOpen = false;
  }
}
