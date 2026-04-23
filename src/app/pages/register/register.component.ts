import { Component, OnInit, OnDestroy} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  user = { username: '', password: '', name: '', lastName: '',  age: '' , email: ''  };

  rawImages: string[] = [
    'https://res.cloudinary.com/tfgmulti/image/upload/v1776987184/bg1_i3vyfr.jpg',
    'https://res.cloudinary.com/tfgmulti/image/upload/v1776987184/bg2_n9oou1.jpg',
    'https://res.cloudinary.com/tfgmulti/image/upload/v1776987184/bg3_jnvk58.jpg',
    'https://res.cloudinary.com/tfgmulti/image/upload/v1776987185/bg4_vjvgwt.jpg',
  ];
  currentSlide = 0;
  private carouselInterval: any;

  constructor(private register: RegisterService, private router: Router , private sanitizer: DomSanitizer) {}

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
