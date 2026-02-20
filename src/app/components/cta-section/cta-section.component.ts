import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
})
export class CtaSectionComponent {
   benefits = [
    {
      icon: 'fas fa-calendar-check',
      title: 'Eventos exclusivos',
      description: 'Accede a conciertos y quedadas musicales'
    },
    {
      icon: 'fas fa-users',
      title: 'Comunidad activa',
      description: 'Conecta con músicos de tu ciudad'
    },
    {
      icon: 'fas fa-star',
      title: 'Contenido premium',
      description: 'Descubre álbumes y artistas emergentes'
    }
  ];

  onRegister(): void {
    // Aquí iría el registro
    console.log('Redirigir a registro');
  }

  onLogin(): void {
    // Aquí iría el login
    console.log('Redirigir a login');
  }
}

