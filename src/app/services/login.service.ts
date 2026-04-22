import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private apiUrl = 'https://blogcert-backend.up.railway.app/api/usuarios';
  
    constructor(private http: HttpClient) {}
  
    login(credentials:any): Observable<any>{
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }
  }