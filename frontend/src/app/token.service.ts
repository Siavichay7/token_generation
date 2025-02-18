import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Token {
  id: number;
  codigo: string;
  usado: boolean;
  fechaGeneracion: Date;
  fechaUso: Date | null;
  usuario: {
    id: number;
    nombre: string;
    fechaCreacion: Date;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl = 'http://localhost:9000/token';
  private tokensSubject = new BehaviorSubject<Token[]>([]);
  private currentUserSubject = new BehaviorSubject<string>('');
  
  tokens$ = this.tokensSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarTokens(); // Carga inicial de tokens
  }

  setCurrentUser(user: string) {
    this.currentUserSubject.next(user);
    this.cargarTokens();
  }

  getCurrentUser(): string {
    return this.currentUserSubject.value;
  }

  private cargarTokens() {
    this.obtenerTokens().subscribe();
  }

  generarToken(cliente: string): Observable<string> {
    return this.http
      .get<string>(`${this.apiUrl}/generarToken?cliente=${cliente}`)
      .pipe(
        tap(() => {
          // Después de generar un token, actualizar la lista
          this.cargarTokens();
        })
      );
  }

  usarToken(cliente: string, token: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}/usarToken?cliente=${cliente}&token=${token}`)
      .pipe(
        tap(() => {
          // Después de usar un token, actualizar la lista
          this.cargarTokens();
        })
      );
  }

  obtenerTokens(): Observable<Token[]> {
    return this.http.get<Token[]>(`${this.apiUrl}/tokens`).pipe(
      tap(tokens => {
        this.tokensSubject.next(tokens);
      })
    );
  }
}
