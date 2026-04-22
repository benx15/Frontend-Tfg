import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SinGrupoComponent } from './pages/sin-grupo/sin-grupo.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { WorkerComponent } from './pages/worker/worker.component';
import { NewsComponent } from './pages/news/news.component';
import { GroupComponent } from './pages/group/group.component';
import { EventComponent } from './pages/event/event.component';
import {  adminGuard,trabajadorGuard,clienteGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'sin-grupo', component: SinGrupoComponent, canActivate: [clienteGuard],  },
  { path: 'user', component: UserComponent, canActivate: [clienteGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: 'admin/add', component: AddComponent, canActivate:[adminGuard] },   
  { path: 'admin/list', component: ListComponent, canActivate: [adminGuard]},
  { path: 'worker', component: WorkerComponent, canActivate:[trabajadorGuard] },
  {path: 'worker/list-news', component: NewsComponent , canActivate:[trabajadorGuard]},
  {path: 'worker/list-groups', component: GroupComponent, canActivate:[trabajadorGuard]},
  {path: 'worker/list-events' , component: EventComponent, canActivate:[trabajadorGuard]}
  
];