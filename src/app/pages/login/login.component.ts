import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private login: LoginService, private router: Router) {}

  onLogin(): void {
    this.login.login(this.credentials).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
      
        if(res.rol === 'ADMON') this.router.navigate(['/dashboard-admin']);
        else if(res.rol === 'TRABAJADOR') this.router.navigate(['/dashboard-trabajador']);
        else this.router.navigate(['/dashboard-cliente']);
      },
      error: err => alert(err.error.mensaje)
    });
  }
}
