import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosScreenComponent } from './usuarios-screen.component';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosScreenComponent,
    children: [
      { path: 'lista', component: ListaComponent },
      { path: 'detalle/:id', component: DetalleComponent },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosScreenRoutingModule {}
