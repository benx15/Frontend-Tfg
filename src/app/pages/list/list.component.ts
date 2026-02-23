import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  
  usuarios: any[] = [];
  usuariosPaginados: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalPaginas: number = 0;

  mostrarModal: boolean = false;
  modoEdicion: boolean = false;

  usuarioForm: any = {
    username: '',
    password: '',
    name: '',
    lastName: '',
    age: 0,
    email: '',
    rol: 'TRABAJADOR',
  };
  
  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    console.log('INICIO');
    this.cargar();
  }
  cargar():void {
    this.adminService.buscarTodos().subscribe({
      next: (data) => {
        this.usuarios=data;
        console.log(' Usuarios cargados:', this.usuarios.length);
        this.calcularPaginacion();
        this.actualizarPagina();
      },
      error: (err) => console.error('Error usuarios:' , err)
    });
  }
  calcularPaginacion(): void {
    this.totalPaginas = Math.ceil(this.usuarios.length / this.itemsPorPagina);
    if (this.totalPaginas === 0) this.totalPaginas = 1;
  }
  actualizarPagina(): void {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.usuariosPaginados = this.usuarios.slice(inicio, fin);
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
  abrirModalEditar(usuario: any): void {
    this.modoEdicion = true;
    this.usuarioForm = {
      _id: usuario._id,
      username: usuario.username || '',
      password: usuario.password || '',
      name: usuario.name || '',
      lastName: usuario.lastName || '',
      age: usuario.age !== undefined ? Number(usuario.age) : 0,
      email: usuario.email || '',
      rol: usuario.rol || 'TRABAJADOR',
    };
    this.mostrarModal = true;
  }
  cerrarModal(): void {
    this.mostrarModal = false;
    this.resetearFormulario();
  }
  resetearFormulario(): void {
    this.usuarioForm = {
      username: '',
      password: '',
      name: '',
      lastName: '',
      age: 0,
      email: '',
      rol: 'TRABAJADOR'
    };
  }
  guardarUsuario(): void {
    if (!this.usuarioForm.username || !this.usuarioForm.email) {
      alert('Por favor, completa los campos obligatorios (Nombre y Email)');
      return;
    }
    if (!this.modoEdicion && !this.usuarioForm.password) {
      alert('La contraseña es obligatoria para crear un usuario');
      return;
    }
    if (this.modoEdicion) {
      this.actualizarUsuario();
    } 
  }

  actualizarUsuario(): void {
    const usuarioActualizado = {
      _id: this.usuarioForm._id,
      username: this.usuarioForm.username,
      password: this.usuarioForm.password,
      name: this.usuarioForm.name,
      lastName: this.usuarioForm.lastName,
      age: this.usuarioForm.age,
      email: this.usuarioForm.email,
      rol: this.usuarioForm.rol
    };
    if (this.usuarioForm.password && this.usuarioForm.password.trim() !== '') {
      usuarioActualizado.password = this.usuarioForm.password;
    }
    this.adminService.actualizar(this.usuarioForm._id, usuarioActualizado).subscribe({
      next: (response) => {
        console.log('Usuario actualizado:', response);
        alert('Usuario actualizado correctamente');
        this.cerrarModal();
        this.cargar();
        this.calcularPaginacion();
        this.actualizarPagina();
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        alert('Error al actualizar el usuario.');
      }
    });
  }
  borrarUsuario(id: string): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }
    
    this.adminService.borrar(id).subscribe({
      next: (response) => {
        console.log('Usuario eliminado:', response);
        alert('Usuario eliminado satisfactoriamente');
        this.usuarios = this.usuarios.filter(u => u._id !== id);
        this.calcularPaginacion();
      
        if (this.usuariosPaginados.length === 1 && this.paginaActual > 1) {
          this.paginaActual--;
        }
      
        this.actualizarPagina();
      },
      error: (err) => {
        console.error(' Error al eliminar usuario:', err);
        alert('Error al eliminar un usuario. Intente de nuevo.');
      }
    });
  }

}
