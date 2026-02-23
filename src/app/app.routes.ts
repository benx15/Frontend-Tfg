import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SinGrupoComponent } from './pages/sin-grupo/sin-grupo.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'sin-grupo', component: SinGrupoComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/add', component: AddComponent },   
  { path: 'admin/list', component: ListComponent}
 
  
];