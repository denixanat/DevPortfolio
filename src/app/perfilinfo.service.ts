import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Perfil, Proyecto } from 'src/app/interfaces/perfiles.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PerfilinfoService {

  public perfiles: Perfil[] = [];

  constructor(private http: HttpClient) {
    window.localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNzAxNTQ5OTIyLCJleHAiOjE3MDE1NjQzMjJ9.xzzgYguWES2gt5Bw72-s0P3xPF9GC58ErT9CjwRjWfc");
  }

  fetchdatafromapi(): Observable<any> {
    return this.http.get("http://localhost:8080/api/perfiles", 
    {
      headers:{
        "Authorization":window.localStorage.getItem("token")?? "",
      }
    });
  }

  agregarProyectoAlPerfil(usuarioId: number, nuevoProyecto: Proyecto): Observable<Perfil[]> {
    const perfilIndex = this.perfiles.findIndex(perfil => perfil.userid === usuarioId);

    if (perfilIndex !== -1) {
      nuevoProyecto.projectid = this.perfiles[perfilIndex].proyectos.length + 1;
      this.perfiles[perfilIndex].proyectos.push(nuevoProyecto);
      return of([...this.perfiles]);
    } else {
      console.error(`No se encontró el perfil con ID ${usuarioId}.`);
      return of(this.perfiles);
    }
  }

  eliminarProyecto(usuarioId: number, projectId: number): Observable<Perfil[]> {
    const perfilIndex = this.perfiles.findIndex(perfil => perfil.userid === usuarioId);
  
    if (perfilIndex !== -1) {
      const updatedProyectos = this.perfiles[perfilIndex].proyectos.filter(proyecto => proyecto.projectid !== projectId);
      this.perfiles[perfilIndex].proyectos = updatedProyectos;
  
      // Make an HTTP request to update the data on the server
      this.http.put(`http://localhost:8080/api/perfiles/${usuarioId}`, this.perfiles[perfilIndex])
        .subscribe(
          () => {
            console.log(`Proyecto con ID ${projectId} eliminado con éxito.`);
          },
          error => {
            console.error('Error al actualizar el perfil en el servidor:', error);
          }
        );
  
      return of([...this.perfiles]);
    } else {
      console.error(`No se encontró el perfil con ID ${usuarioId}.`);
      return of(this.perfiles);
    }
  }
  

  actualizarPerfil(usuarioId: number, datosPerfil: any): Observable<Perfil[]> {
    const perfilIndex = this.perfiles.findIndex(perfil => perfil.userid === usuarioId);

    if (perfilIndex !== -1) {
      this.perfiles[perfilIndex] = { ...this.perfiles[perfilIndex], ...datosPerfil };
      return of([...this.perfiles]);
    } else {
      console.error(`No se encontró el perfil con ID ${usuarioId}.`);
      return of(this.perfiles);
    }
  }

  getPerfilData(): Observable<Perfil[]> {
    return of(this.perfiles);
  }
}
