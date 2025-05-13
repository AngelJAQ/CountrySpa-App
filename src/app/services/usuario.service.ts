import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, switchMap, tap, catchError, shareReplay, map } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  private usuariosSimulados: Usuario[] = [
    { id: 1, nombre: 'Juan Perez', correo: 'juan@example.com', rol: 'estudiante' },
    { id: 2, nombre: 'Ana López', correo: 'ana@example.com', rol: 'profesor' },
    { id: 3, nombre: 'Carlos García', correo: 'carlos@example.com', rol: 'administrador' }
  ];

  private filtroSubject = new BehaviorSubject<string>('');
  usuariosFiltrados$: Observable<Usuario[]>;

  constructor(private http: HttpClient) {
    this.usuariosFiltrados$ = this.filtroSubject.asObservable().pipe(
      debounceTime(300),
      switchMap(filtro => this.getUsuarios(filtro)),
      shareReplay(1)
    );
  }

  setFiltro(filtro: string) {
    this.filtroSubject.next(filtro);
  }

  getUsuarios(filtro: string = ''): Observable<Usuario[]> {
  const filtrados = this.usuariosSimulados.filter(u =>
    u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    u.rol.toLowerCase().includes(filtro.toLowerCase())
  );
  return of(filtrados);
  }


  getUsuarioPorId(id: number): Observable<Usuario | undefined> {
    const encontrado = this.usuariosSimulados.find(u => u.id === id);
    return of(encontrado);
  }

  registrarUsuario(usuario: { nombre: string; correo: string; rol: string }): Observable<Usuario> {
    const nuevoUsuario: Usuario = {
      id: this.usuariosSimulados.length + 1,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    };

    this.usuariosSimulados.push(nuevoUsuario);
    this.setFiltro(this.filtroSubject.value);

    return of(nuevoUsuario);
  }
}
