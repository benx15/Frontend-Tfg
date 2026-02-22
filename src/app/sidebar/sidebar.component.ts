import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
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
      label: 'Usuarios',
      isExpanded: false,
      children: [
        { icon: 'fas fa-user-plus', label: 'Añadir Usuario', route: '/users/add' },
        { icon: 'fas fa-users', label: 'Lista de Usuarios', route: '/users/list' },
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