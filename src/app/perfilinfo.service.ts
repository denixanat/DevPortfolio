import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Perfil, Proyecto } from 'src/app/interfaces/perfiles.interfaces';
@Injectable({
  providedIn: 'root'
})
export class PerfilinfoService{

  public perfiles: Perfil[] = [];

    constructor(private http: HttpClient){

    }

    fetchdatafromapi(): Observable<any>{
      return this.http.get("http://localhost:8080/api/module1");
    }

 // Método para agregar un nuevo proyecto a un perfil existente
 agregarProyectoAlPerfil(usuarioId: number, nuevoProyecto: Proyecto): Observable<Perfil[]> {
  const perfilIndex = this.perfiles.findIndex(perfil => perfil.userid === usuarioId);

  if (perfilIndex !== -1) {
    // Asignar un nuevo projectid al proyecto
    nuevoProyecto.projectid = this.perfiles[perfilIndex].proyectos.length + 1;

    // Agregar el nuevo proyecto al perfil
    this.perfiles[perfilIndex].proyectos.push(nuevoProyecto);

    // Devolver una copia actualizada de la lista de perfiles
    return of([...this.perfiles]);
  } else {
    // Si el perfil no se encuentra, puedes manejarlo según tus necesidades
    console.error(`No se encontró el perfil con ID ${usuarioId}.`);
    return of(this.perfiles);
  }
}


actualizarPerfil(usuarioId: number, datosPerfil: any): Observable<Perfil[]> {
  const perfilIndex = this.perfiles.findIndex(perfil => perfil.userid === usuarioId);

  if (perfilIndex !== -1) {
    // Actualizar los datos del perfil
    this.perfiles[perfilIndex] = { ...this.perfiles[perfilIndex], ...datosPerfil };

    // Devolver una copia actualizada de la lista de perfiles
    return of([...this.perfiles]);
  } else {
    // Si el perfil no se encuentra, puedes manejarlo según tus necesidades
    console.error(`No se encontró el perfil con ID ${usuarioId}.`);
    return of(this.perfiles);
  }
}


  getPerfilData(): Observable<Perfil[]> {
    return of(this.perfiles);
  }
}
