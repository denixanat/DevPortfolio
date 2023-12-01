import { Component, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Perfil, Proyecto } from '../interfaces/perfiles.interfaces';
import { PerfilinfoService } from '../perfilinfo.service';
import { NgForm } from '@angular/forms';

// Declare global variables
declare var $: any;
declare var bootstrap: any;
declare var SimpleLightbox: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements AfterViewInit {
  @Input()
  public Perfil: Perfil = {
    userid: 0,
    name: "",
    image: "",
    shortdesc: "",
    longdesc: "",
    links: {},
    proyectos: [],
  };

  nextProjectId = 1;
  proyectoAgregado: boolean = false;
  nuevoProyecto: Proyecto | null = null;

  tempNombre: string = "";
  tempFiltro: string = "";
  tempImagen: string = "";

  // Variables for editing profile information
  tempShortDesc: string = "";
  tempLongDesc: string = "";
  tempProfileImage: string = "";
  tempLinkedin: string = "";
  tempGithub: string = "";
  tempTwitter: string = "";

  constructor(private perfilInfoService: PerfilinfoService, private cdr: ChangeDetectorRef) {
  
  }

  ngOnInit() {
    this.perfilInfoService.getPerfilData().subscribe((data: Perfil[]) => {
      if (data && data.length > 0) {
        this.Perfil = data[0];
        // Initialize form data when component loads
        this.tempShortDesc = this.Perfil.shortdesc;
        this.tempLongDesc = this.Perfil.longdesc;
        this.tempProfileImage = this.Perfil.image;
        this.tempLinkedin = this.Perfil.links?.linkedin || '';
        this.tempGithub = this.Perfil.links?.github || '';
        this.tempTwitter = this.Perfil.links?.twitter || '';
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
  

  agregarNuevoProyecto(form: NgForm): void {
    const nuevoProyecto: Proyecto = {
      projectid: this.nextProjectId++,
      name: this.tempNombre,
      filter: this.tempFiltro,
      image: this.tempImagen,
    };

    this.nuevoProyecto = nuevoProyecto;

    this.perfilInfoService.agregarProyectoAlPerfil(this.Perfil.userid, nuevoProyecto).subscribe(
      perfiles => {
        this.Perfil = perfiles.find(profile => profile.userid === this.Perfil.userid) || this.Perfil;
        this.proyectoAgregado = true;
        form.reset();
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error al agregar el proyecto:', error);
        this.proyectoAgregado = false;
      }
    );
  }

  actualizarPerfil(form: NgForm): void {
    this.perfilInfoService.actualizarPerfil(this.Perfil.userid, {
      shortdesc: form.value.shortdesc,
      longdesc: form.value.longdesc,
      image: form.value.image,
      links: {
        linkedin: form.value.linkedin,
        github: form.value.github,
        twitter: form.value.twitter,
      }
    }).subscribe(
      perfiles => {
        this.Perfil = perfiles.find(profile => profile.userid === this.Perfil.userid) || this.Perfil;
        console.log('Perfil actualizado con éxito');
      },
      error => {
        console.error('Error al actualizar el perfil:', error);
      }
    );
  }
}
