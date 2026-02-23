import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HomeComponent,
    SidebarComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  sidebarCollapsed = false;

  onSidebarToggle(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
