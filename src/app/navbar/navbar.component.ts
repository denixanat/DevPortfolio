import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  isExplorarModule: boolean = false;
  isPerfilModule: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url.split('/')[1]; // Get the first segment of the route
        this.isExplorarModule = currentRoute === 'explorar';
        this.isPerfilModule = currentRoute === 'perfil';
      }
    });
  }
}