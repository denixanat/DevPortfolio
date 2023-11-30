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
        const currentRoute = event.url.split('/')[1];
        this.isExplorarModule = currentRoute === 'explorar';
        this.isPerfilModule = currentRoute === 'perfil';
      }
    });
  }

  searchByTerm(event: Event) {
    this.communicationService.sendSearchTerm(this.searchTerm);

    // Navigate to the 'explorar' route
    this.router.navigate(['/explorar']);

    event.preventDefault();
  }
}
