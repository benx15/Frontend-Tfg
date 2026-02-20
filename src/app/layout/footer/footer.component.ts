import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'fab fa-facebook-f', url: '#', label: 'Facebook' },
    { icon: 'fab fa-twitter', url: '#', label: 'Twitter' },
    { icon: 'fab fa-instagram', url: '#', label: 'Instagram' },
    { icon: 'fab fa-youtube', url: '#', label: 'YouTube' }
  ];

  quickLinks = [
    { name: 'Inicio', url: '/' },
    { name: 'Eventos', url: '/eventos' },
    { name: 'Comunidad', url: '/comunidad' },
  ];

  supportLinks = [
    { name: 'Ayuda', url: '/ayuda' },
    { name: 'Contacto', url: '/contacto' },
    { name: 'FAQ', url: '/faq' },
    { name: 'Soporte', url: '/soporte' }
  ];

  legalLinks = [
    { name: 'Privacidad', url: '/privacidad' },
    { name: 'Términos', url: '/terminos' },
    { name: 'Cookies', url: '/cookies' }
  ];
}