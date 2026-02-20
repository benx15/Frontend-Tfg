import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface News {
  id: number;
  title: string;
  excerpt: string;
  category: 'concierto' | 'quedada' | 'album' | 'otra';
  icon: string;
  date: string;
  author: string;
}

@Component({
  selector: 'app-news-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './n-preview.component.html',
  styleUrls: ['./n-preview.component.scss']
})
export class NewsPreviewComponent {
  newsItems: News[] = [
    {
      id: 1,
      title: 'Concierto de Jazz en el Teatro Principal',
      excerpt: 'No te pierdas esta velada única con los mejores músicos de jazz de la ciudad.',
      category: 'concierto',
      icon: 'fas fa-music',
      date: '15 Feb 2026',
      author: 'María García'
    },
    {
      id: 2,
      title: 'Quedada musical en el parque',
      excerpt: 'Trae tu instrumento y únete a nosotros para una tarde de música al aire libre.',
      category: 'quedada',
      icon: 'fas fa-users',
      date: '18 Feb 2026',
      author: 'Juan López'
    },
    {
      id: 3,
      title: 'Nuevo álbum: "Ecos del Tiempo"',
      excerpt: 'Ya disponible el esperado álbum de nuestra banda local favorita.',
      category: 'album',
      icon: 'fas fa-compact-disc',
      date: '10 Feb 2026',
      author: 'Ana Martínez'
    },
    {
      id: 4,
      title: 'Actualización de la plataforma',
      excerpt: 'Nuevas funcionalidades disponibles para todos los usuarios.',
      category: 'otra',
      icon: 'fas fa-info-circle',
      date: '12 Feb 2026',
      author: 'Admin'
    }
  ];

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      concierto: 'CONCIERTO',
      quedada: 'QUEDADA',
      album: 'ÁLBUM',
      otra: 'OTRA'
    };
    return labels[category] || 'OTRA';
  }
}