import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, switchMap, tap, catchError, shareReplay } from 'rxjs/operators';
import { map } from 'rxjs/operators';


export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Simulación
  private cacheUsuarios: Usuario[] | null = null;

  private filtroSubject = new BehaviorSubject<string>('');
  usuariosFiltrados$: Observable<Usuario[]>;

  constructor(private http: HttpClient) {
    this.usuariosFiltrados$ = this.filtroSubject.asObservable().pipe(
      debounceTime(300),
      switchMap(filtro => this.getUsuarios(filtro)),
      shareReplay(1) // cachea el último resultado
    );
  }

  setFiltro(filtro: string) {
    this.filtroSubject.next(filtro);
  }

  getUsuarios(filtro: string = ''): Observable<Usuario[]> {
    if (this.cacheUsuarios) {
      const filtrados = this.cacheUsuarios.filter(u =>
        u.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
      return of(filtrados);
    }

    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      tap(usuarios => this.cacheUsuarios = usuarios),
      map(usuarios =>
        usuarios.filter(u => u.nombre.toLowerCase().includes(filtro.toLowerCase()))
      ),
      catchError(err => {
        console.error('Error al cargar usuarios', err);
        return of([]);
      })
    );
  }

  getUsuarioPorId(id: number): Observable<Usuario | undefined> {
    if (this.cacheUsuarios) {
      return of(this.cacheUsuarios.find(u => u.id === id));
    }

    return this.http.get<Usuario>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(undefined))
    );
  }
}
