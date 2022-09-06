import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Usuario } from './login/usuario';
import { environment } from '../environments/environment'

import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL: string = environment.apiURLBase + "/api/usuarios";
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      /* Transforma o token string em formato JSON */
      const token = JSON.parse(tokenString).access_token; 
      return token;
    }

    return null;
  }

  /* Fazer logout */
  encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();
    if (token) {
      const usuarioAutenticado = this.jwtHelper.decodeToken(token).user_name;
      return usuarioAutenticado;
    }

    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);

      /* Se o token não estiver espirado, está autenticado */
      return !isExpired; 
    }

    return false;
  }

  /* Observable, pois a requisição é assíncrona */
  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  tentarLogar(username: string, password: string) : Observable<any> {
    const params = new HttpParams()
                    .set('username', username)
                    .set('password', password)
                    .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenURL, params.toString(), { headers });
  }
}
