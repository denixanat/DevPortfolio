import { Component, Input, ChangeDetectorRef, AfterViewInit, NgZone } from '@angular/core';
import { Perfil, Proyecto } from '../interfaces/perfiles.interfaces';
import { PerfilinfoService } from '../perfilinfo.service';
import { NgForm } from '@angular/forms';

// Declare global variables
declare var $: any;

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

  constructor(private perfilInfoService: PerfilinfoService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}






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
    // Your filtering script here, based on the structure of your HTML
    // Example:
    $(document).ready(() => {
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
    const nuevoProyecto = {
      projectid: this.nextProjectId++,
      image: this.tempImagen,
      name: this.tempNombre,
      filter: this.tempFiltro,
    };

    this.nuevoProyecto = nuevoProyecto;

    this.perfilInfoService.agregarProyectoAlPerfil(nuevoProyecto, 1).subscribe({
      next: () => {
        this.proyectoAgregado = true;
        form.reset();
        this.cdr.detectChanges();

        console.log(this.nuevoProyecto?.name);
      },
      error: (error: any) => {
        console.error('Error al agregar el proyecto:', error);
        this.proyectoAgregado = false;
      },
    });
  }

  
  actualizarPerfil(form: NgForm): void {
  const perfilUpdate = {
    name: form.value.name,
    image: form.value.image,
    shortdesc: form.value.shortdesc,
    longdesc: form.value.longdesc,
    links: {
      linkedin: form.value.linkedin,
      github: form.value.github,
      twitter: form.value.twitter,
    }
  };

  this.perfilInfoService.actualizarPerfil(perfilUpdate)
    .subscribe({
      next: (updatedProfile: any) => {
        this.Perfil = updatedProfile;
        console.log(this.Perfil.name);
        console.log('Perfil actualizado con éxito');
      },
      error: (error: any) => {
        console.error('Error al actualizar el perfil:', error);
      }
    });
}

eliminarProyecto(projectId: number): void {
  const usuarioId = 1; // Fixed user ID as per your requirement

  this.perfilInfoService.eliminarProyectoDelPerfil(usuarioId, projectId).subscribe(
    () => {
      console.log('Proyecto eliminado con éxito');

      // Manually remove the project from the local array
      this.Perfil.proyectos = this.Perfil.proyectos.filter(proyecto => proyecto.projectid !== projectId);

      // Use NgZone to run the change detection in Angular's zone
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    },
    error => {
      console.error('Error al eliminar el proyecto:', error);
    }
  );
}
}