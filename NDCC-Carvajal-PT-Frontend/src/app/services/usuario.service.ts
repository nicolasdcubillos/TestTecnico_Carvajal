import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  URL = 'https://localhost:7209/usuario'; 
  constructor( private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  getAll(): Observable<any> {
    return this.http.get(`${this.URL}`);
  }

  create(usuario: any): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.URL}` , usuario, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }

  update(id: Number, usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.URL}/` + id, usuario, this.httpOptions);
  }

  find(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL}` + id);
  }
}
