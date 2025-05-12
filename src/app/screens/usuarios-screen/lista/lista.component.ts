import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.usuariosFiltrados$.subscribe(data => {
      this.usuarios = data;
    });
  }

  onBuscar(filtro: string) {
    this.usuarioService.setFiltro(filtro);
  }
}
