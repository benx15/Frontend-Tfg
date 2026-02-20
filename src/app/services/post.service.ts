import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [
    {
      id: 1,
      title: 'Festival Social 2026',
      content: 'El mayor encuentro musical del año.',
      imageUrl: 'assets/img/festival.jpg',
      category: 'concierto',
      createdAt: '2026-02-15',
      likes: 34,
      commentsCount: 12
    },
    {
      id: 2,
      title: 'Nuevo álbum indie recomendado',
      content: 'Una joya sonora que debes escuchar.',
      imageUrl: 'assets/img/album.jpg',
      category: 'album',
      createdAt: '2026-02-14',
      likes: 18,
      commentsCount: 6
    }
  ];

  getLatestPosts(): Observable<Post[]> {
    return of(this.posts);
  }
}