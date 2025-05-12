import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';

const routes: Routes = [
  {path: '', component: HomeScreenComponent, pathMatch: 'full'},
  { path: 'usuarios', loadChildren: () => import('./screens/usuarios-screen/usuarios-screen.module').then(m => m.UsuariosScreenModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
