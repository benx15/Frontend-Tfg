import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrabajadorService } from '../../services/trabajador.service';

@Component({
  selector: 'app-group-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  grupos: any[] = [];
  loading = true;
  error = false;


  modalAbierto = false;
  modoEdicion = false;
  form: any = {};
  grupoEditandoId: string | null = null;
  grupoABorrar: any = null;


  modalBorrarAbierto = false;
  grupoBorrandoId: string | null = null;
  

  readonly colores = [
    'pi-yellow', 'pi-mint',   'pi-pink',   'pi-blue',
    'pi-coral',  'pi-purple', 'pi-amber',  'pi-teal'
  ];



  constructor(private trabajadorService: TrabajadorService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarGrupos();
  }

  cargarGrupos(): void {
  this.loading = true;
  this.error = false;
  this.trabajadorService.buscarGrupos().subscribe({
    next: (data: any) => {
      this.grupos = data;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('error:', err);
      this.error = true;
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}

  
  getColor(index: number): string {
    return this.colores[index % this.colores.length];
  }

  
  abrirModalCrear(): void {
    this.modoEdicion = false;
    this.form = {};
    this.grupoEditandoId = null;
    this.modalAbierto = true;
  }

  
  abrirModalEditar(grupo: any): void {
    this.modoEdicion = true;
    this.form = { ...grupo };
    this.grupoEditandoId = grupo._id.toString();
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.form = {};
  }

  guardarGrupo(): void {
    if (this.modoEdicion && this.grupoEditandoId) {
      this.trabajadorService.actualizarGrupo(this.grupoEditandoId, this.form).subscribe({
        next: () => { this.cerrarModal(); this.cargarGrupos(); },
        error: () => { this.error = true; }
      });
    } else {
      this.trabajadorService.crearGrupo(this.form).subscribe({
        next: () => { this.cerrarModal(); this.cargarGrupos(); },
        error: () => { this.error = true; }
      });
    }
  }

  abrirModalBorrar(grupo: any): void {
    this.grupoABorrar = grupo;
    this.grupoBorrandoId = grupo._id.toString();
    this.modalBorrarAbierto = true;
  }
  
  cerrarModalBorrar(): void {
    this.modalBorrarAbierto = false;
    this.grupoBorrandoId = null;
    this.grupoABorrar = null;
  }

  confirmarBorrar(): void {
    if (!this.grupoBorrandoId) return;
    this.error = false;
    this.trabajadorService.borrarGrupo(this.grupoBorrandoId ).subscribe({
      next: () => { this.cerrarModalBorrar(); this.cargarGrupos(); },
      error: () => { this.error = true; }
    });
  }

}