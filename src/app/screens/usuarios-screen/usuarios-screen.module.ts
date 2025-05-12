import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosScreenRoutingModule } from './usuarios-screen-routing.module';
import { UsuariosScreenComponent } from './usuarios-screen.component';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';


@NgModule({
  declarations: [
    UsuariosScreenComponent,
    ListaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    UsuariosScreenRoutingModule
  ]
})
export class UsuariosScreenModule { }
