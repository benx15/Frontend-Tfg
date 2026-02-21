import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      HeaderComponent,
      FooterComponent,
    
      RouterOutlet,
      CommonModule,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class AppComponent{
    title = 'pgpri';
    mostrarHeaderFooter = true;

    constructor(private router: Router) {}

    ngOnInit(): void {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.mostrarHeaderFooter = !event.url.includes('/login') && !event.url.includes('/registro');
      });
    }
  }