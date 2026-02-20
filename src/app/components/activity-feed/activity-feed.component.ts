import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  icon: string;
  iconColor: string;
}

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss',
})
export class ActivityFeedComponent {
   activities: Activity[] = [
    {
      id: 1,
      user: 'Carlos Mendez',
      action: 'se unió al evento',
      target: 'Concierto de Jazz',
      time: 'Hace 5 minutos',
      icon: 'fas fa-user-plus',
      iconColor: '#3498db'
    },
    {
      id: 2,
      user: 'Paula Sánchez',
      action: 'comentó en',
      target: 'Quedada musical en el parque',
      time: 'Hace 15 minutos',
      icon: 'fas fa-comment',
      iconColor: '#2fa85f'
    },
    {
      id: 3,
      user: 'Pedro Ruiz',
      action: 'compartió el álbum',
      target: 'Ecos del Tiempo',
      time: 'Hace 1 hora',
      icon: 'fas fa-share',
      iconColor: '#d96e3f'
    },
    {
      id: 4,
      user: 'Ana Torres',
      action: 'le gustó',
      target: 'Concierto de Rock',
      time: 'Hace 2 horas',
      icon: 'fas fa-heart',
      iconColor: '#e74c3c'
    },
  ];
}
