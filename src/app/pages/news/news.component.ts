import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from '../../services/trabajador.service';

@Component({
  selector: 'app-news-component',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  
  noticias: any[] = [];
  noticiasPaginadas: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalPaginas: number = 0;

  mostrarModal: boolean = false;
  modoEdicion: boolean = false;

  noticiaForm: any = {
    titular: '',
    tematica: '',
    contenido: '',
    genero: '',
    
    
  };
  
  constructor(
    private trabajadorService: TrabajadorService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    console.log('INICIO');
    this.cargar();
  }
  cargar():void {
    this.trabajadorService.buscarNoticias().subscribe({
      next: (data : any) => {
        this.noticias=data;
        console.log(' Noticias cargadas:', this.noticias.length);
        this.calcularPaginacion();
        this.actualizarPagina();
      },
      error: (err : any) => console.error('Error noticias:' , err)
    });
  }
  calcularPaginacion(): void {
    this.totalPaginas = Math.ceil(this.noticias.length / this.itemsPorPagina);
    if (this.totalPaginas === 0) this.totalPaginas = 1;
  }
  actualizarPagina(): void {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.noticiasPaginadas = this.noticias.slice(inicio, fin);
    this.cdr.detectChanges();
  }
  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPagina();
    }
  }
  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPagina();
    }
  }
  abrirModalCrear(): void {
    this.modoEdicion = false;
    this.resetearFormulario();
    this.mostrarModal = true;
  }
  abrirModalEditar(noticia: any): void {
    this.modoEdicion = true;
    this.noticiaForm = {
      _id: noticia._id,
      titular: noticia.titular || '',
      tematica: noticia.tematica || '',
      contenido: noticia.contenido || '',
      genero: noticia.genero || ''
    };
    this.mostrarModal = true;
  }
  cerrarModal(): void {
    this.mostrarModal = false;
    this.resetearFormulario();
  }
  resetearFormulario(): void {
    this.noticiaForm = {
      titular: '',
      tematica:  '',
      contenido:  '',
      genero:  ''
      
    };
  }
  guardarNoticia(): void {
    
    if (this.modoEdicion) {
      this.actualizarNoticia();
    } else {
      this.crearNoticia();
    }
  }
  crearNoticia(): void {
    const nuevaNoticia = {
      titular: this.noticiaForm.titular ,
      tematica: this.noticiaForm.tematica ,
      contenido: this.noticiaForm.contenido ,
      genero: this.noticiaForm.genero 
      
      
    };
    this.trabajadorService.crearNoticia(nuevaNoticia).subscribe({
      next: (response : any) => {
        console.log(' Usuario creado:', response);
        alert('Usuario creado correctamente');
        this.cerrarModal();
        this.cargar();
        this.calcularPaginacion();
        this.actualizarPagina();
      },
      error: (err: any) => {
        console.error(' Error al crear usuario:', err);
        alert('Error al crear el usuario. Intenta de nuevo.');
      }
    });
  }
  actualizarNoticia(): void {
    const noticiaActualizada = {
      _id: this.noticiaForm._id,
      titular: this.noticiaForm.titular ,
      tematica: this.noticiaForm.tematica ,
      contenido: this.noticiaForm.contenido ,
      genero: this.noticiaForm.genero 
      
      
    };
    
    this.trabajadorService.actualizarNoticia(this.noticiaForm._id, noticiaActualizada).subscribe({
      next: (response : any) => {
        console.log('Noticia actualizada:', response);
        alert('Noticia actualizado correctamente');
        this.cerrarModal();
        this.cargar();
        this.calcularPaginacion();
        this.actualizarPagina();
      },
      error: (err : any) => {
        console.error('Error al actualizar noticia:', err);
        alert('Error al actualizar el noticia.');
      }
    });
  }


}