import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthResponse, JwtToken, User } from '../interfaces/interfaces';
import jwtDecode from 'jwt-decode';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _baseUrl: string = environment.apiUrl;
  _usuario!: User;

  constructor(private http: HttpClient) {}
  get usuario() {
    return { ...this._usuario };
  }
  login(username: string, password: string) {
    const url = `${this._baseUrl}/login`;
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (!resp.error) {
          console.log('respuesta', resp);
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            username: resp.user?.username!,
            authorities: resp.user?.authorities!,
            enabled: resp.user?.enabled!,
          };
          Cookie.set('user', JSON.stringify(this._usuario));
        }
      }),
      map(() => of(true)),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    Cookie.delete('user');
  }

  isValidToken(token: string): boolean {
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodificar token
      const expirationTimestamp = tokenData.exp * 1000; // Convertir segundos a milisegundos
      return expirationTimestamp > Date.now();
    } catch (error) {
      return false; // Manejo de errores, por ejemplo, token inválido
    }
  }

  DecodeToken(token: string): JwtToken {
    return jwtDecode<JwtToken>(token);
  }
  setAuthenticatedUser(user: User) {
    this._usuario = user;
  }
}
