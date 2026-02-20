import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/cliente'; 

  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }



  obtenerGrupos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/grupos`, {
      headers: this.getHeaders()
    });
  }

  obtenerEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventos`, {
      headers: this.getHeaders()
    });
  }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, {
      headers: this.getHeaders()
    });
  }

 

  agregarUsuarioAGrupo(payload: { usuarioId: string, grupoId: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/agregarUsuarioAGrupo`, 
      payload, 
      {
        headers: this.getHeaders()
      }
    );
  }

  

  agregarUsuarioAEvento(payload: { usuarioId: string, eventoId: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/agregarUsuarioAEvento`, 
      payload, 
      {
        headers: this.getHeaders()
      }
    );
  }

 

  obtenerGrupoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/grupos/${id}`, {
      headers: this.getHeaders()
    });
  }

  obtenerEventoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/eventos/${id}`, {
      headers: this.getHeaders()
    });
  }

}