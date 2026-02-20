import { Component,  OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  credentials = { username: '', password: '' };

  rawImages: string[] = [
    'assets/bg1.jpg',
    'assets/bg2.jpg',
    'assets/bg3.jpg',
    'assets/bg4.jpg',
  ];

  currentSlide = 0;
  private carouselInterval: any;

  constructor(private login: LoginService, private router: Router , private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    clearInterval(this.carouselInterval);
  }

  getImageUrl(path: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${path}')`);
  }

  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.rawImages.length;
    }, 4000);
  }

  onLogin(): void {
    this.login.login(this.credentials).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);

        if (!res.grupo) {
        this.router.navigate(['/sin-grupo,component']);
        return;
      }

        if(res.rol === 'ADMON') this.router.navigate(['/dashboard-admin']);
        else if(res.rol === 'TRABAJADOR') this.router.navigate(['/dashboard-trabajador']);
        else this.router.navigate(['/user.component']);
      },
      error: err => alert(err.error.mensaje)
    });
  }
}
