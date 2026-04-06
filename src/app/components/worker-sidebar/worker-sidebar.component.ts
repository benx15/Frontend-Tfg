import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-worker-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './worker-sidebar.component.html',
  styleUrls: ['./worker-sidebar.component.scss']
})
export class WorkerSidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'fas fa-user',
      label: 'Noticias',
      isExpanded: false,
      children: [
        { icon: 'fas fa-users', label: 'Lista de Noticias', route: '/worker/list-news' },
      ]
    },
    {
      icon: 'fas fa-user',
      label: 'Eventos',
      isExpanded: false,
      children: [
        { icon: 'fas fa-users', label: 'Lista de Eventos', route: '/worker/list-events' },
      ]
    },
    {
      icon: 'fas fa-user',
      label: 'Grupos',
      isExpanded: false,
      children: [
        { icon: 'fas fa-users', label: 'Lista de Grupos', route: '/worker/list-groups' },
      ]
    },
    {
      icon: 'fas fa-cog',
      label: 'Configuración',
      isExpanded: false,
      children: [
        { icon: 'fas fa-sliders-h', label: 'Preferencias', route: '/settings/preferences' },
        { icon: 'fas fa-lock', label: 'Seguridad', route: '/settings/security' },
      ]
    },
    {
      icon: 'fas fa-envelope',
      label: 'Mensajes',
      route: '/messages'
    },
    {
      icon: 'fas fa-chart-bar',
      label: 'Reportes',
      route: '/reports'
    }
  ];

  onToggleSidebar() {
    this.toggle.emit();
  }

  toggleSubmenu(item: MenuItem) {
    if (item.children && !this.collapsed) {
      item.isExpanded = !item.isExpanded;
    }
  }
}