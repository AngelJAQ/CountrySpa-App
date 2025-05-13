import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { UsuariosScreenRoutingModule } from './usuarios-screen-routing.module';
import { UsuariosScreenComponent } from './usuarios-screen.component';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    UsuariosScreenComponent,
    ListaComponent,
    DetalleComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    UsuariosScreenRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuariosScreenModule { }
