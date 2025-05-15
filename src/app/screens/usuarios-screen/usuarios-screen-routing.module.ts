import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosScreenComponent } from './usuarios-screen.component';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosScreenComponent,
    children: [
      { path: 'lista', component: ListaComponent },
      { path: 'detalle/:id', component: DetalleComponent },
      { path: 'registro', component: RegistroComponent },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosScreenRoutingModule {}
