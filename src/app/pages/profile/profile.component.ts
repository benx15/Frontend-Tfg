import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{

  constructor(private eventosService: EventosService){}

  readonly userName = '';
  readonly email = '';

  ngOnInit(): void {
    this.loadMyEvents();
  }

  loadMyEvents(): void {

    const myJoinedIds: string[] = JSON.parse(localStorage.getItem('user_events_ids') || '[]');

    this.eventosService.getEventos().subscribe({
      next: (allEvents: any[]) => {
      
        this.joinedEvents = allEvents
          .filter(e => myJoinedIds.includes(e._id)) 
          .map(e => ({
            artistName: e.artista || 'Artista Desconocido',
            artistId: e.artistaId || '0',
            item: {
              id: e._id,
              title: e.nombre,
              date: e.fecha,
              category: e.tipo || 'default'
            }
          }));
      },
      error: (err) => console.error('Error al traer eventos:', err)
    });
  }


  profileImageUrl = this.buildAvatarUrl(this.userName);

  get maskedEmail(): string {
    const [local, domain] = this.email.split('@');
    if (!local || !domain) {
      return 'correo oculto';
    }
    const visible = local.slice(0, 2);
    return `${visible}${'*'.repeat(Math.max(2, local.length - 2))}@${domain}`;
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
  public joinedEvents: any[] = [];

  

}
