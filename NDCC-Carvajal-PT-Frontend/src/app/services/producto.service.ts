import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  URL = 'https://localhost:7209/Producto'; 
  constructor( private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }).set("Authorization", "Bearer " + localStorage.getItem('userToken'))
  }
  
  getAll(): Observable<any> {
    return this.http.get(`${this.URL}/getAll`, this.httpOptions);
  }

  create(producto: any): Observable<Producto> {
    return this.http.post<Producto>(`${this.URL}/create` , producto, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/delete/${id}`, this.httpOptions);
  }

  update(id: Number, Producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(`${this.URL}/update/` + id, Producto, this.httpOptions);
  }

  find(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.URL}/getById` + id, this.httpOptions);
  }
}
