// explorar.component.ts
import { Component, OnInit } from '@angular/core';
import { PerfilinfoService } from 'src/app/perfilinfo.service';
import { Perfil, Proyecto } from 'src/app/interfaces/perfiles.interfaces';
import { CommunicationService } from '../communication.service';
@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css'],
})
export class ExplorarComponent implements OnInit {
  perfiles: Perfil[] = [];
  filteredPerfiles: Perfil[] = [];

  constructor(
    private perfilInfoService: PerfilinfoService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.perfilInfoService.getPerfilData().subscribe((perfiles) => {
      this.perfiles = perfiles;
      this.filteredPerfiles = perfiles; // Initial display without filtering
    });

    // Subscribe to the search term observable
    this.communicationService.searchTerm$.subscribe((searchTerm) => {
      console.log('ExplorarComponent: Search term received in component:', searchTerm);
      this.onSearch(searchTerm);
    });
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
    console.log('All projects:', this.perfiles);
    
    this.filteredPerfiles = this.perfiles.filter((perfil) =>
      perfil.proyectos.some((proyecto) => {
        const includes = proyecto.name.toLowerCase().includes(searchTerm.toLowerCase());
        console.log(`Project: ${proyecto.name}, Match: ${includes}`);
        return includes;
      })
    );
  
    console.log('Filtered projects:', this.filteredPerfiles);
  }
  
}

