import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      HeaderComponent,
      FooterComponent,
      HomeComponent,
      CommonModule,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class AppComponent{
    title = 'pgpri';
  }