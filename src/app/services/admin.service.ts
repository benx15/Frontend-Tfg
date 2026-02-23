import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AdminService {

  private apiUrl = 'http://localhost:3000/admin';
    
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
    
  buscarTodos(): Observable<any>{
    return this.http.get(`${this.apiUrl}/buscarTodos` , this.getHeaders());
  }
  crearUno(usuario:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/crearUno`, usuario , this.getHeaders());
  }
  actualizar(id: string, usuario: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, usuario , this.getHeaders());
  }
  borrar(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      headers: this.getHeaders().headers,
      responseType: 'text'
    });
  }
}