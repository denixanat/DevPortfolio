// explorar.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilinfoService } from 'src/app/perfilinfo.service';
import { Perfil } from 'src/app/interfaces/perfiles.interfaces';
import { CommunicationService } from '../communication.service';

declare var $: any; // Declare $ as a global variable

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit, AfterViewInit {
  perfiles: Perfil[] = [];
  filteredPerfiles: Perfil[] = [];

  constructor(
    private perfilInfoService: PerfilinfoService,
    private communicationService: CommunicationService,
    private route: ActivatedRoute,
    private router: Router // Inject the Router service here
  ) {
    this.perfilInfoService.fetchdatafromapi().subscribe({
      next: (response: any) => {
        this.perfilInfoService.perfiles = response.gatoslista;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['searchTerm'];
      if (searchTerm) {
        // If there is a search term in the query parameters, perform the search
        this.onSearch(searchTerm);
      } else {
        // Otherwise, load the initial data
        this.perfilInfoService.getPerfilData().subscribe((perfiles) => {
          this.perfiles = perfiles;
          this.filteredPerfiles = perfiles; // Initial display without filtering
        });
      }
    });

    // Subscribe to the search term observable
    this.communicationService.searchTerm$.subscribe((searchTerm) => {
      // If the component is already initialized, perform the search
      if (!this.route.snapshot.queryParams['searchTerm']) {
        this.onSearch(searchTerm);
      }
    });
  }

  ngAfterViewInit(): void {
    $(document).ready(() => {
      // Your filtering script here, based on the structure of your HTML
      // Example:
      $(".filter-button").click(function (this: HTMLElement) {
        const value = $(this).attr('data-filter');
  
        if (value === "all") {
          // Show all profiles
          $('.filter').show('1000');
        } else {
          // Hide profiles not matching the filter
          $(".filter").not('.' + value).hide('3000');
          // Show profiles matching the filter
          $('.filter').filter('.' + value).show('3000');
        }
  
        // Update the class for the active state
        $(".filter-button").removeClass("active");
        $(this).addClass("active");
      });
    });
  }
  

  onSearch(searchTerm: string) {
    // Filter profiles based on the search term
    this.filteredPerfiles = this.perfiles.filter((perfil) =>
      perfil.proyectos.some((proyecto) => proyecto.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Update the query parameters to reflect the search term in the URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm },
      queryParamsHandling: 'merge',
    });
  }
}
