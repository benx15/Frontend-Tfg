import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { EventosService } from '../../services/eventos.service';
import { NoticiasService } from '../../services/noticias.service';
type Vista = 'inicio' | 'noticias' | 'eventos' | 'posts' | 'mis-posts' | 'artistas';

interface PostConVotos {
  _id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  autor: { id: string; username: string };
  grupo: { id: string; nombre: string };
  respuestas: any[];
  likes: number;
  dislikes: number;
  miVoto: 'like' | 'dislike' | null;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,  FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {


  vistaActual: Vista = 'inicio';

  usuarioId: string = localStorage.getItem('usuarioId') || '';

  noticias: any[]            = [];
  noticiasMostradas: any[]   = [];   
  eventos: any[]             = [];
  eventosMostrados: any[]    = [];   
  grupos: any[]              = [];
  posts: PostConVotos[]      = [];
  misPosts: any[]            = [];
  misRespuestas: any[]       = [];
  misArtistas: any[]         = [];

  eventoSeleccionado: any = null;
  noticiaSeleccionada: any      = null;
  grupoSeleccionado: any        = null;
  postSeleccionado: PostConVotos | null = null;


  nuevoPost     = { titulo: '', contenido: '' };
  nuevaRespuesta = '';


  cargando   = false;
  mensaje    = '';
  tabActiva: 'posts' | 'respuestas' = 'posts';

  
  eventosApuntados = new Set<string>();

  constructor(
    private clienteService: ClienteService,
    private eventoService: EventosService,
    private noticiaService: NoticiasService
  ) {}

  ngOnInit(): void {
    if (!this.usuarioId) {
    this.mensaje = "Error: No se encontró sesión de usuario.";
    return;
  }
  this.cargarDatosIniciales();
  this.cargarGruposDelUsuario();
  }

  cargarGruposDelUsuario(): void {
    this.cargando = true;
    this.clienteService.verMisGrupos(this.usuarioId).subscribe({
      next: (res) => {
        this.grupos = res.grupos || [];
        this.cargando = false;
    
        if (this.grupos.length > 0) {
          this.verPostsGrupo(this.grupos[0]);
        }
      },
      error: () => { 
        this.mensaje = "Error al cargar tus grupos.";
        this.cargando = false; 
      }
    });
  }


  cargarDatosIniciales(): void {
    this.noticiaService.buscarTodas().subscribe({
      next: d => {
        this.noticias = d;
        this.noticiasMostradas = d.slice(0, 3);
      },
      error: () => {}
    });
    this.eventoService.getEventos().subscribe({
      next: d => {
        this.eventos = d;
        this.eventosMostrados = d.slice(0, 3);
      },
      error: () => {}
    })
    
  }


  irA(vista: Vista): void {
    this.vistaActual = vista;
    this.limpiarSeleccion();
    if (vista === 'mis-posts') this.cargarMisPublicaciones();
    if (vista === 'artistas')  this.cargarMisArtistas();
  }

  limpiarSeleccion(): void {
    this.noticiaSeleccionada  = null;
    this.grupoSeleccionado    = null;
    this.postSeleccionado     = null;
    this.mensaje              = '';
  }

  
  verNoticia(noticia: any): void {
    this.noticiaSeleccionada = noticia;
  }
  verEvento(evento: any) {
    this.eventoSeleccionado = evento;
  }

  
  apuntarseEvento(evento: any): void {
    if (this.eventosApuntados.has(evento._id)) return;
    this.clienteService.agregarUsuarioAEvento({ usuarioId: this.usuarioId, eventoId: evento._id }).subscribe({
      next: () => {
        this.eventosApuntados.add(evento._id);
        this.mensaje = `¡Apuntado a "${evento.nombre}" correctamente!`;
      },
      error: () => { this.mensaje = 'Error al apuntarse al evento.'; }
    });
  }

  estaApuntado(eventoId: string): boolean {
    return this.eventosApuntados.has(eventoId);
  }

  
  verPostsGrupo(grupo: any): void {
    this.grupoSeleccionado = grupo;
    this.cargando = true;
    this.clienteService.verPostsDeGrupo(grupo._id).subscribe({
      next: res => {
        
        this.posts = (res.publicaciones || []).map((p: any) => ({
          ...p,
          likes:   0,
          dislikes: 0,
          miVoto:  null
        }));
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  verPost(post: PostConVotos): void {
    this.postSeleccionado = post;
    this.nuevaRespuesta   = '';
  }


  votar(post: PostConVotos, voto: 'like' | 'dislike'): void {
    if (post.miVoto === voto) {
      // Quitar voto
      voto === 'like' ? post.likes-- : post.dislikes--;
      post.miVoto = null;
    } else {
      
      if (post.miVoto === 'like')    post.likes--;
      if (post.miVoto === 'dislike') post.dislikes--;
      voto === 'like' ? post.likes++ : post.dislikes++;
      post.miVoto = voto;
    }
  }


  publicarPost(): void {
    if (!this.nuevoPost.titulo || !this.nuevoPost.contenido || !this.grupoSeleccionado) return;
    this.cargando = true;
    this.clienteService.crearPost({
      titulo:    this.nuevoPost.titulo,
      contenido: this.nuevoPost.contenido,
      usuarioId: this.usuarioId,
      grupoId:   this.grupoSeleccionado._id
    }).subscribe({
      next: res => {
        const nuevo: PostConVotos = { ...res.publicacion, likes: 0, dislikes: 0, miVoto: null };
        this.posts.unshift(nuevo);
        this.nuevoPost = { titulo: '', contenido: '' };
        this.mensaje   = 'Post publicado correctamente.';
        this.cargando  = false;
      },
      error: () => { this.mensaje = 'Error al publicar.'; this.cargando = false; }
    });
  }

  
  enviarRespuesta(): void {
    if (!this.nuevaRespuesta || !this.postSeleccionado) return;
    this.cargando = true;
    this.clienteService.responderPost({
      publicacionId: this.postSeleccionado._id,
      usuarioId:     this.usuarioId,
      contenido:     this.nuevaRespuesta
    }).subscribe({
      next: res => {
        this.postSeleccionado!.respuestas.push(res.respuesta);
        this.nuevaRespuesta = '';
        this.cargando       = false;
      },
      error: () => { this.mensaje = 'Error al responder.'; this.cargando = false; }
    });
  }

  cargarMisPublicaciones(): void {
    this.cargando = true;
    this.clienteService.verMisPosts(this.usuarioId).subscribe({
      next: res => { this.misPosts = res.publicaciones || []; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
    this.clienteService.verMisRespuestas(this.usuarioId).subscribe({
      next: res => { this.misRespuestas = res.respuestas || []; },
      error: () => {}
    });
  }

  seleccionarGrupoParaPost(grupoId: string): void {
    this.grupoSeleccionado = this.grupos.find(g => g._id === grupoId) || null;
  }


  cargarMisArtistas(): void {
    this.cargando = true;
    this.clienteService.verMisArtistas(this.usuarioId).subscribe({
      next: res => { this.misArtistas = res.artistas || []; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }


  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    const d   = new Date(fecha);
    const dd  = String(d.getDate()).padStart(2, '0');
    const mm  = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh  = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  }
}