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
    
    buscarNoticias(): Observable<any> {
        return this.http.get(`${this.apiUrl}/buscarNoticias`, this.getHeaders());
    }   

    crearNoticia(noticia: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/crearNoticia`, noticia, this.getHeaders());
    }

    actualizarNoticia(id: string, noticia: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/noticiaActualizar/${id}`, noticia, this.getHeaders());
    }

    borrarNoticia(id: string,): Observable<any> {
        return this.http.delete(`${this.apiUrl}/borrarNoticia/${id}`, this.getHeaders())
    }

    buscarGrupos(): Observable<any> {
        return this.http.get(`${this.apiUrl}/buscarGrupos`, this.getHeaders());
    }

    crearGrupo(grupo: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/crearGrupo`, grupo, this.getHeaders());
    }

    actualizarGrupo(id: string, grupo: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/grupoActualizar/${id}`, grupo, this.getHeaders());
    }

    borrarGrupo(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/borrarGrupo/${id}`, this.getHeaders())
    }

    buscarEventos(): Observable<any> {
        return this.http.get(`${this.apiUrl}/buscarEventos`, this.getHeaders());
    }

    crearEvento(evento: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/crearEvento`, evento, this.getHeaders());
    }

    actualizarEvento(id: string, evento: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/eventoActualizar/${id}`, evento, this.getHeaders());
    }

    borrarEvento(id: string, ): Observable<any> {
        return this.http.delete(`${this.apiUrl}/borrarEvento/${id}`, this.getHeaders())
    }
}