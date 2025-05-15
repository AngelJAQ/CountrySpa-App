import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.registroForm.controls;
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos correctamente.';
      return;
    }

    const { nombre, correo, rol } = this.registroForm.value;

    this.usuarioService.registrarUsuario({ nombre, correo, rol })
      .subscribe(
        response => {
          this.router.navigate(['/usuarios/lista']);
        },
        error => {
          this.errorMessage = 'Error al registrar el usuario. Intente nuevamente.';
        }
      );
  }
}
