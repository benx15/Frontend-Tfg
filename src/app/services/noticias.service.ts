import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NoticiasService {

    private apiUrl = 'https://blogcert-backend.up.railway.app/api/noticias';

    constructor(private http: HttpClient) {}

    buscarTodas(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/mostrarTodas`);
    }
    buscarPorTema(tematica:string):Observable<any[]>{
        return this.http.get<any[]>(`${this.apiUrl}/busca/${tematica}`);
    }
    buscarPorTitular(search:string): Observable<any[]>{
        const params = new HttpParams().set('search',search);
        return this.http.get<any[]>(`${this.apiUrl}/buscador`, { params });
    }
    obtenerTematicas(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/temetica`);
    }
}