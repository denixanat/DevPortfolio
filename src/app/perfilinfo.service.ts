import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Perfil, Proyecto } from 'src/app/interfaces/perfiles.interfaces';
import { Usuario } from './interfaces/usuario.interfaces';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PerfilinfoService {

  public perfiles: Perfil[] = [];

  constructor(private http: HttpClient) {
  
  }
  login(datacredenciales:Usuario): Observable<any> {
    // Perform login API request
    return this.http.post('http://localhost:8080/api/auth/login', datacredenciales );
  }

  setToken(token: string): void {
    window.localStorage.setItem("token", token);
  }

  isAuthenticated(): boolean {
    return !!window.localStorage.getItem("token");
  }

  private messageSubject = new BehaviorSubject<string | null>(null);

  setMessage(message: string): void {
    this.messageSubject.next(message);
  }

  getMessage(): BehaviorSubject<string | null> {
    return this.messageSubject;
  }
  

  fetchdatafromapi(): Observable<any> {
    return this.http.get('http://localhost:8080/api/perfiles', {
      headers: {
        "Authorization": window.localStorage.getItem("token") || "",
      }
    });
  }


  eliminarProyectoDelPerfil(usuarioId: number, projectId: number): Observable<any> {
    // Construct the URL for the delete request
    const url = `http://localhost:8080/api/perfiles/${usuarioId}/proyectos/${projectId}`;

    // Return the observable directly from the HTTP delete request
    return this.http.delete(url);
  }
  

  actualizarPerfil(datosPerfil: any): Observable<any> {
    const url = `http://localhost:8080/api/perfiles/656a6eaafe1536d91cd11300/profile`;
  
    return this.http.put(url, datosPerfil);
  }
  
  agregarProyectoAlPerfil(nuevoProyecto: Proyecto, usuarioId: number): Observable<any> {
    nuevoProyecto.projectid = this.perfiles[0].proyectos.length + 1;

    // Push the new project into the proyectos array
    this.perfiles[0].proyectos.push(nuevoProyecto);
    console.log(nuevoProyecto);

    // Return the observable directly from the HTTP request
    const url = `http://localhost:8080/api/perfiles/${usuarioId}/proyectos`;

    // Send only the nuevoProyecto data in the post request
    return this.http.post(url, nuevoProyecto);
  }


  getPerfilData(): Observable<Perfil[]> {
    return of(this.perfiles);
  }
}
