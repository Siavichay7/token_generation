import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl = 'http://localhost:3000/token';

  constructor(private http: HttpClient) {}

  generarToken(cliente: string): Observable<string> {
    return this.http.get<string>(
      `${this.apiUrl}/generarToken?cliente=${cliente}`
    );
  }

  usarToken(cliente: string, token: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/usarToken?cliente=${cliente}&token=${token}`
    );
  }

  obtenerTokens(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tokens`);
  }
}
