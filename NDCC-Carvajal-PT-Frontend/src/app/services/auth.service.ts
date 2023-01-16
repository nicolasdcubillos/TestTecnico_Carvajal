import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;

  URL = 'https://localhost:7209'; 

  constructor( private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  isAuthenticated() {
    return this.isLogged;
  }

  logout() {
    this.isLogged = false;
  }
  
  login_successfull() {
    this.isLogged = true;
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.URL}/Security/login`, usuario);
  }
}
