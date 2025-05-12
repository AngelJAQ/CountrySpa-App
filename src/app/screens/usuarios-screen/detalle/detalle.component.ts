import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService, Usuario } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  usuario?: Usuario;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id)) {
      this.usuarioService.getUsuarioPorId(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }
}
