import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ArtistCard {
  id: number;
  name: string;
  image: string;
  genre: string;
}

@Component({
  selector: 'app-artist-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-preview.component.html',
  styleUrls: ['./artist-preview.component.scss']
})
export class ArtistPreviewComponent {
  constructor(private router: Router) {}

  artists: ArtistCard[] = [
    {
      id: 1,
      name: 'The Strokes',
      image: 'assets/the-strokes.jpg',
      genre: 'Rock alternativo'
    },
    {
      id: 2,
      name: 'Rosalía',
      image: 'assets/rosalia.jpg',
      genre: 'Flamenco urbano'
    },
    {
      id: 3,
      name: 'Radiohead',
      image: 'assets/radiohead.jpg',
      genre: 'Rock experimental'
    },
    {
      id: 4,
      name: 'Bad Bunny',
      image: 'assets/bad-bunny.jpg',
      genre: 'Reggaeton'
    }
  ];

  goToArtist(id: number): void {
    this.router.navigate(['/artistas', id]);
  }
}