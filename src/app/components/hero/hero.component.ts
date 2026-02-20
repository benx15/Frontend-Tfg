import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  title = 'Bienvenido a Blogcert';
  subtitle = 'Tu comunidad para compartir musica y de eventos';
  description = 'Descubre conciertos, quedadas, álbumes y mucho más';

  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  currentVideoIndex = 0;
  videos = [
    'assets/videos/hero-video-1.mp4',
    'assets/videos/hero-video-2.mp4',
    'assets/videos/hero-video-3.mp4',
    'assets/videos/hero-video-4.mp4',
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onVideoEnded(): void {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
    const video = this.videoElement.nativeElement;
    video.src = this.videos[this.currentVideoIndex];
    video.load();
    video.play();
  }
}