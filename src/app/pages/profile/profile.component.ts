import { CommonModule } from '@angular/common';
import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule,  RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{

  constructor(private cdr: ChangeDetectorRef,private clienteService: ClienteService ){}

  name = localStorage.getItem('nombre') || '';
  lastName = localStorage.getItem('apellido') || '';
  usuarioId = localStorage.getItem('usuarioId') || '';

  profileImageUrl = this.buildAvatarUrl(this.name);
  public joinedEvents: any[] = [];

  ngOnInit(): void {
    this.loadMyEvents();
  }

  loadMyEvents(): void {
    this.clienteService.verMisEventos(this.usuarioId).subscribe({
      next: (res:any) => {
        console.log('Eventos recibidos:', res.eventos.length);
        console.log('Primer evento:', res.eventos?.[0]);
        this.joinedEvents = res.eventos.map((e: any) => ({
          artistName: e.artista?.[0]?.nombreArtistico || 'Artista Desconocido',
          artistId:   e.artista?.[0]?.id || '0',
          item: {
            id:       e.id,
            title:    e.nombre,
            date:     e.fecha,
            category: e.genero || 'default'
          }
        }));
        this.cdr.detectChanges(); 
        console.log('joinedEvents tras mapeo:', this.joinedEvents);
      },
    
      error: (err:any) => console.error('Error al traer eventos:', err)
    });
  }


  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.profileImageUrl = result;
      }
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  private buildAvatarUrl(userName: string): string {
    const safe = encodeURIComponent(userName);
    return `https://api.dicebear.com/9.x/initials/svg?seed=${safe}&backgroundColor=667eea,764ba2,3498db`;
  }
  


}
