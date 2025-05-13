import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService, Usuario } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const filtroRol = params['rol'] || '';
    this.usuarioService.setFiltro(filtroRol);
  });

  this.usuarioService.usuariosFiltrados$.subscribe(data => {
    this.usuarios = data;
    console.log(this.usuarios);
  });
}



  onBuscar(filtro: string) {
    this.usuarioService.setFiltro(filtro);
  }
}
