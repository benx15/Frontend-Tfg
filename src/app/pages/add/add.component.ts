import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-component',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit{
    modoEdicion = false;
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
    crearUsuario(): void {
        const nuevoUsuario = {
          username: this.usuarioForm.username,
          password: this.usuarioForm.password,
          name: this.usuarioForm.name,
          lastName: this.usuarioForm.lastName,
          age: this.usuarioForm.age,
          email: this.usuarioForm.email,
          rol: this.usuarioForm.rol
        };
        this.adminService.crearUno(nuevoUsuario).subscribe({
          next: (response) => {
            console.log(' Usuario creado:', response);
            alert('Usuario creado correctamente');
          },
          error: (err) => {
            console.error(' Error al crear usuario:', err);
            alert('Error al crear el usuario. Intenta de nuevo.');
          }
        });
      }
  

}