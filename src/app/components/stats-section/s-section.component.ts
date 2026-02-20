import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './s-section.component.html',
  styleUrls: ['./s-section.component.scss']
})
export class StatsSectionComponent {
  stats = [
    {
      icon: 'fas fa-users',
      value: '1,234',
      label: 'Miembros activos',
      color: '#3498db'
    },
    {
      icon: 'fas fa-calendar-alt',
      value: '89',
      label: 'Eventos este mes',
      color: '#2fa85f'
    },
    {
      icon: 'fas fa-compact-disc',
      value: '456',
      label: 'Álbumes compartidos',
      color: '#d96e3f'
    },
    {
      icon: 'fas fa-music',
      value: '23',
      label: 'Conciertos próximos',
      color: '#4a8ad4'
    }
  ];
}