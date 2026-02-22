import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPreviewComponent } from '../../components/news-preview/n-preview.component';
import { ArtistPreviewComponent } from '../../components/artist-preview/artist-preview.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    NewsPreviewComponent,
    ArtistPreviewComponent
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  goTo(link: string): void {
    alert(`Ir a ${link}`);
  }
}