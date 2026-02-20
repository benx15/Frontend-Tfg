import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselSlide {
  id: number;
  url: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-gallery-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './g-preview.component.html',
  styleUrls: ['./g-preview.component.scss']
})
export class GalleryPreviewComponent implements OnInit, OnDestroy {
  currentSlide: number = 0;
  private intervalId: any;

  slides: CarouselSlide[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
      title: 'Únete a Conciertos Increíbles',
      description: 'Descubre eventos musicales en tu ciudad'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
      title: 'Conecta con Músicos',
      description: 'Forma parte de una comunidad apasionada'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      title: 'Participa en Festivales',
      description: 'No te pierdas ningún evento importante'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800',
      title: 'Comparte tu Pasión',
      description: 'Publica, comenta y descubre nueva música'
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
      this.cdr.detectChanges(); // Fuerza detección de cambios
    }, 3000);
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 
      ? this.slides.length - 1 
      : this.currentSlide - 1;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}