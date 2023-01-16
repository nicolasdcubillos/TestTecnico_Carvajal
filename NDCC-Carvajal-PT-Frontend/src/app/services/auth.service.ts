import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'https://localhost:7209/Security'; 

  constructor( private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  isAuthenticated() {
    return (localStorage.getItem('userToken') != null)    
  }

  logout() {
    localStorage.removeItem('userToken');
  }
  
  login_successfull(token: string) {
    localStorage.setItem('userToken', token);
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${this.URL}/login`, usuario, {
      responseType: 'text' as 'json'});
  }
}
