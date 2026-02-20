import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from '../../components/hero/hero.component';
import { StatsSectionComponent } from '../../components/stats-section/s-section.component';
import { NewsPreviewComponent } from '../../components/news-preview/n-preview.component';
import { ActivityFeedComponent } from '../../components/activity-feed/activity-feed.component';
import { GalleryPreviewComponent } from '../../components/g-preview/g-preview.component';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    StatsSectionComponent,
    NewsPreviewComponent,
    ActivityFeedComponent,
    GalleryPreviewComponent,
    CtaSectionComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  ngOnInit() {

    this.posts = [
      {
        id: 1,
        title: 'asdasd',
        content: 'dasdw',
        imageUrl: 'calle',
        category: 'concierto',
        createdAt: 'fecha',
        likes: 2,
        commentsCount: 1,
      },
      {
        id: 2,
        title: 'asdasd',
        content: 'dasdw',
        imageUrl: 'calle',
        category: 'concierto',
        createdAt: 'fecha',
        likes: 2,
        commentsCount: 1,
      }
    ];
  }
}