import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { WorkerSidebarComponent } from '../../components/worker-sidebar/worker-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-worker',
  standalone: true,
  imports: [
    HomeComponent,
    WorkerSidebarComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent {
  sidebarCollapsed = false;

  onSidebarToggle(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
