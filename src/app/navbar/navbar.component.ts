import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommunicationService } from '../communication.service';

// Declare global variables
declare var $: any;
declare var bootstrap: any;
declare var SimpleLightbox: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    // Navbar scripts
    window.addEventListener('DOMContentLoaded', () => {
      var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
          return;
        }
        if (window.scrollY === 0) {
          navbarCollapsible.classList.remove('navbar-shrink');
        } else {
          navbarCollapsible.classList.add('navbar-shrink');
        }
      };

      navbarShrink();

      document.addEventListener('scroll', navbarShrink);

      const mainNav = document.body.querySelector('#mainNav');
      if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          rootMargin: '0px 0px -40%',
        });
      }

      const navbarToggler = document.body.querySelector('.navbar-toggler');
      const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
      );

     

    });

  }

  searchByTerm(event: Event) {
    this.communicationService.sendSearchTerm(this.searchTerm);

    // Navigate to the 'explorar' route
    this.router.navigate(['/explorar']);

    event.preventDefault();
  }
}
