import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private url = 'blogcert-backend.up.railway.app/api/grupos/buscarTodas';

  constructor(private http: HttpClient) {}

  getGrupos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}