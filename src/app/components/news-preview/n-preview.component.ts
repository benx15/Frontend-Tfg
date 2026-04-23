
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-news-preview',
  standalone: true,                         
  imports: [CommonModule, FormsModule],      
  templateUrl: './n-preview.component.html',
  styleUrls: ['./n-preview.component.scss']
})
export class NewsPreviewComponent implements OnInit {
  newsItems: any[] = [];
  tematicas: string[] = [];
  tematicaSeleccionada: string = '';
  searchText: string = '';

  constructor(private noticiasService: NoticiasService ) {}

  ngOnInit(): void {
    this.cargarTodas();
    this.cargarTematicas();
  }

  cargarTodas(): void {
    this.noticiasService.buscarTodas().subscribe({
      next: (data:any) => this.newsItems = data.slice(0,4),
      error: (err:any) => console.error(err)
    });
  }

  cargarTematicas(): void {
    this.noticiasService.obtenerTematicas().subscribe({
      next: (data:any) => this.tematicas = data,
      error: (err:any) => console.error(err)
    });
  }

  filtrarPorTema(tematica: string): void {
    this.tematicaSeleccionada = tematica;
    this.noticiasService.buscarPorTema(tematica).subscribe({
      next: (data:any) => this.newsItems = data,
      error: (err:any) => console.error(err)
    });
  }

  buscarPorTitular(): void {
    this.noticiasService.buscarPorTitular(this.searchText).subscribe({
      next: (data:any) => this.newsItems = data,
      error: (err:any) => console.error(err)
    });
  }

  limpiarFiltros(): void {
    this.searchText = '';
    this.tematicaSeleccionada = '';
    this.cargarTodas();
  }
  sanitize(str: string): string {
    return str?.replace(/ /g, '-') ?? '';
  }

  getIcon(tematica: string): string {
    const iconos: Record<string, string> = {
      'Grupos':     'fas fa-users',
      'Quedadas':   'fas fa-calendar-check',
      'Album o EP': 'fas fa-compact-disc',
      'Otros':      'fas fa-newspaper'
    };
    return iconos[tematica] ?? 'fas fa-newspaper';
  }
}