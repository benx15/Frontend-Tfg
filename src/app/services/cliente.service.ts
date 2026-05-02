import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://blogcert-backend.up.railway.app/cliente'; 

  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  
  agregarUsuarioAGrupo(payload: { usuarioId: string, grupoId: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/unirseGrupo`, 
      payload, 
      {
        headers: this.getHeaders()
      }
    );
  }

  

  agregarUsuarioAEvento(payload: { usuarioId: string, eventoId: string }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/apuntarseEvento`, 
      payload, 
      {
        headers: this.getHeaders()
      }
    );
  }

  crearPost(payload: { titulo: string; contenido: string; usuarioId: string; grupoId: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/publicar`, payload, { headers: this.getHeaders() });
  }

  responderPost(payload: { publicacionId: string; usuarioId: string; contenido: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/respuesta`, payload, { headers: this.getHeaders() });
  } 
  
  verMisPosts(usuarioId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/misPosts/${usuarioId}`, { headers: this.getHeaders() });
  }

  verMisRespuestas(usuarioId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/misRespuestas/${usuarioId}`, { headers: this.getHeaders() });
  }

  verPostsDeGrupo(grupoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verPostGrupo/${grupoId}`, { headers: this.getHeaders() });
  }


  guardarArtista(payload: { usuarioId: string; artistaId: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardarArtista`, payload, { headers: this.getHeaders() });
  }

  verMisArtistas(usuarioId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/misArtistas/${usuarioId}`, { headers: this.getHeaders() });
  }
  verMisGrupos(usuarioId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/mis-grupos/${usuarioId}` , { headers: this.getHeaders() });
  }

}