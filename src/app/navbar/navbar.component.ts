// navbar.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommunicationService } from '../communication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isExplorarModule: boolean = false;
  isPerfilModule: boolean = false;
  searchTerm: string = '';

  constructor(private router: Router, private communicationService: CommunicationService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url.split('/')[1]; // Get the first segment of the route
        this.isExplorarModule = currentRoute === 'explorar';
        this.isPerfilModule = currentRoute === 'perfil';
      }
    });
  }

  searchByTerm(event: Event) {
    // Emit the search term to be handled by the parent component (e.g., ExplorarComponent)
    // You can customize this logic based on your component structure and requirements
    console.log('Search term:', this.searchTerm);
    this.communicationService.sendSearchTerm(this.searchTerm);
    event.preventDefault(); // Prevent default behavior of the form submission if needed
  }
}
