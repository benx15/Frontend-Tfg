
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArtistaService {
    private apiUrl = 'https://blogcert-backend.up.railway.app/artistas';

    constructor(private http: HttpClient) {}

    getArtistas(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/verArtistas`);
    }
}