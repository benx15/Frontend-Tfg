import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArtistaService } from '../../services/artista.service';

@Component({
  selector: 'app-event-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventos: any[] = [];
  artistas: any[] = [];
  artistasSeleccionados: any[] = [];
  loading = true;
  error = false;

  modalAbierto = false;
  modoEdicion = false;
  form: any = {};
  eventoEditandoId: string | null = null;

  modalBorrarAbierto = false;
  eventoABorrar: any = null;
  eventoBorrandoId: string | null = null;

  readonly colores = [
    { border: '#378ADD', badge: '#E6F1FB', badgeText: '#185FA5' },
    { border: '#1D9E75', badge: '#E1F5EE', badgeText: '#0F6E56' },
    { border: '#D85A30', badge: '#FAECE7', badgeText: '#993C1D' },
    { border: '#7F77DD', badge: '#EEEDFE', badgeText: '#3C3489' },
    { border: '#D4537E', badge: '#FBEAF0', badgeText: '#72243E' },
    { border: '#BA7517', badge: '#FAEEDA', badgeText: '#854F0B' },
  ];

  constructor(
    private trabajadorService: TrabajadorService ,
    private cdr: ChangeDetectorRef,
    private artistaService: ArtistaService
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarArtistas();
  }
  cargarArtistas(): void {
    this.artistaService.getArtistas().subscribe({
        next: (data: any) => this.artistas = data,
        error: (err: any) => console.error('Error al cargar artistas:', err)
    });
  }
  cargarEventos(): void {
    this.loading = true;
    this.error = false;
    this.trabajadorService.buscarEventos().subscribe({
      next: (data: any) => {
        this.eventos = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error al cargar eventos:', err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getColor(index: number) {
    return this.colores[index % this.colores.length];
  }

  
  abrirModalCrear(): void {
    this.modoEdicion = false;
    this.form = {};
    this.eventoEditandoId = null;
    this.modalAbierto = true;
  }


  abrirModalEditar(evento: any): void {
    this.modoEdicion = true;
    this.artistasSeleccionados = evento.artista ? [...evento.artista] : [];

    // Convertir la fecha ISO al formato que entiende datetime-local
    let fechaFormateada = '';
    if (evento.fecha) {
        const fecha = new Date(evento.fecha);
        // Formato YYYY-MM-DDTHH:mm
        fechaFormateada = fecha.toISOString().slice(0, 16);
    }

    this.form = {
        ...evento,
        fecha: fechaFormateada // ← sobreescribir con el formato correcto
    };

    this.eventoEditandoId = evento._id.toString();
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.form = {};
    this.artistasSeleccionados = [];
  }

  estaSeleccionado(id: string): boolean {
    return this.artistasSeleccionados.some(a => a._id === id);
  }

  onArtistaChange(event: any, artista: any): void {
    if (event.target.checked) {
        this.artistasSeleccionados.push({
            _id: artista._id,
            nombreArtistico: artista.nombreArtistico
        });
    } else {
        this.artistasSeleccionados = this.artistasSeleccionados.filter(
            a => a._id !== artista._id
        );
    }
  }


  guardarEvento(): void {
    const payload = {
        ...this.form,
        artista: this.artistasSeleccionados // ← usar los seleccionados
    };
    delete payload.artistas;

    if (this.modoEdicion && this.eventoEditandoId) {
        this.trabajadorService.actualizarEvento(this.eventoEditandoId, payload).subscribe({
            next: () => { this.cerrarModal(); this.cargarEventos(); },
            error: () => { this.error = true; }
        });
    } else {
        this.trabajadorService.crearEvento(payload).subscribe({
            next: () => { this.cerrarModal(); this.cargarEventos(); },
            error: () => { this.error = true; }
        });
    }
  }


  abrirModalBorrar(evento: any): void {
    this.eventoABorrar = evento;
    this.eventoBorrandoId = evento._id.toString();
    this.modalBorrarAbierto = true;
  }

  cerrarModalBorrar(): void {
    this.modalBorrarAbierto = false;
    this.eventoABorrar = null;
    this.eventoBorrandoId = null;
  }

  confirmarBorrar(): void {
    if (!this.eventoBorrandoId) return;
    this.error = false;
    this.trabajadorService.borrarEvento(this.eventoBorrandoId).subscribe({
      next: () => { this.cerrarModalBorrar(); this.cargarEventos(); },
      error: () => { this.error = true; }
    });
  }

}