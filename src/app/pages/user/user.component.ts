import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPreviewComponent } from '../../components/news-preview/n-preview.component';
import { GalleryPreviewComponent } from '../../components/g-preview/g-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NewsPreviewComponent,
    GalleryPreviewComponent
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class HomeComponent {
  goTo(link: string): void {
    alert(`Ir a ${link}`);
  }
}