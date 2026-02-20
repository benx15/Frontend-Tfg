import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GruposService } from '../../services/grupos.service';
import { EventosService } from '../../services/eventos.service';
import { ClienteService } from '../../services/cliente.service';
@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sin-grupo.component.html',
  styleUrls: ['./sin-grupo.component.scss'],
})
export class SinGrupoComponent implements OnInit {
  
  grupos: any[] = [];
  eventos: any[] = [];
  usuarioId: string = localStorage.getItem('usuarioId') || '';

  constructor(
    private gruposService: GruposService,
    private eventosService: EventosService,
    private cdr: ChangeDetectorRef,
    private clienteService: ClienteService 
  ) {}

  ngOnInit(): void {
    console.log(' Dashboard inicializado');
    this.cargarDatos();
  }

  cargarDatos(): void {
    console.log(' Cargando datos...');
    
    this.gruposService.getGrupos().subscribe({
      next: (data) => {
        this.grupos = data;
        console.log(' Grupos cargados:', this.grupos.length);
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(' Error grupos:', err)
    });

    this.eventosService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        console.log(' Eventos cargados:', this.eventos.length);
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(' Error eventos:', err)
    });
  }
   unirseAGrupo(grupoId: string): void {
    const payload = { usuarioId: this.usuarioId, grupoId };
    this.clienteService.agregarUsuarioAGrupo(payload).subscribe({
      next: () => alert('Te has unido al grupo correctamente'),
      error: err => alert(err.error.mensaje)
    });
  }
  apuntarseAEvento(eventoId: string): void {
    const payload = { usuarioId: this.usuarioId, eventoId };
    this.clienteService.agregarUsuarioAEvento(payload).subscribe({
      next: () => alert('Te has apuntado al evento correctamente'),
      error: err => alert(err.error.mensaje)
    });
  }
}