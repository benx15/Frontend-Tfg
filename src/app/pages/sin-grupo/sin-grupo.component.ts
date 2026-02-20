import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GruposService } from '../../services/grupos.service';
import { EventosService } from '../../services/eventos.service';
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

  constructor(
    private gruposService: GruposService,
    private eventosService: EventosService,
    private cdr: ChangeDetectorRef 
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
}