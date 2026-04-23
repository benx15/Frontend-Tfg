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
      image: 'https://res.cloudinary.com/tfgmulti/image/upload/v1776987184/the-strokes_u4fpey.avif',
      genre: 'Rock alternativo'
    },
    {
      id: 2,
      name: 'Rosalía',
      image: 'https://res.cloudinary.com/tfgmulti/image/upload/v1776987226/rosalia_qaqcfl.jpg',
      genre: 'Flamenco urbano'
    },
    {
      id: 3,
      name: 'Radiohead',
      image: 'https://res.cloudinary.com/tfgmulti/image/upload/v1776987209/radiohead_bszjni.jpg',
      genre: 'Rock experimental'
    },
    {
      id: 4,
      name: 'Bad Bunny',
      image: 'https://res.cloudinary.com/tfgmulti/image/upload/v1776987183/bad-bunny_cinnlm.jpg',
      genre: 'Reggaeton'
    }
  ];

  goToArtist(id: number): void {
    this.router.navigate(['/artistas', id]);
  }
}