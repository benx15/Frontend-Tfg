import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrabajadorService {

    private apiUrl = 'http://localhost:3000/trabajador';
    
    constructor(private http: HttpClient) {}

    private getHeaders() {
        let token = null;

        if (typeof window !== 'undefined' && localStorage) {
            token = localStorage.getItem('token');
        }
    
        return {
        headers: new HttpHeaders({
            'Authorization': token ? `Bearer ${token}` : ''
        })
        };
    }
    
    buscarNoticias(): Observable<any>{
    return this.http.get(`${this.apiUrl}/buscarNoticias` , this.getHeaders());
    }
    crearNoticia(usuario:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/crearNoticia`, usuario , this.getHeaders());
    }
    actualizarNoticia(id: string, usuario: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/noticiaActualizar/${id}`, usuario , this.getHeaders());
    }
    buscarGrupos(): Observable<any>{
    return this.http.get(`${this.apiUrl}/buscarGrupos` , this.getHeaders());
    }
    crearGrupo(usuario:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/crearGrupo`, usuario , this.getHeaders());
    }
    actualizarGrupo(id: string, usuario: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/grupoActualizar/${id}`, usuario , this.getHeaders());
    }
    buscarEventos(): Observable<any>{
    return this.http.get(`${this.apiUrl}/buscarEventos` , this.getHeaders());
    }
    crearEvento(usuario:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/crearEvento`, usuario , this.getHeaders());
    }
    actualizarEvento(id: string, usuario: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/eventoActualizar/${id}`, usuario , this.getHeaders());
    }
    
}