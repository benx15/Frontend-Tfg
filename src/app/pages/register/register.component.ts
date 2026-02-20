import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user = { username: '', password: '', name: '', lastName: '',  age: '' , email: ''  };

  constructor(private register: RegisterService, private router: Router) {}

  onRegister(): void {
    this.register.register(this.user).subscribe({
      next: res => {
        alert(res.mensaje);
        this.router.navigate(['/login']);
      },
      error: err => alert(err.error.mensaje)
    });
  }
}
