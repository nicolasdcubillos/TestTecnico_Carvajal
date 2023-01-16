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
    })
  }
  
  getAll(): Observable<any> {
    return this.http.get(`${this.URL}`);
  }

  create(producto: any): Observable<Producto> {
    return this.http.post<Producto>(`${this.URL}` , producto, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }

  update(id: Number, Producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(`${this.URL}/` + id, Producto, this.httpOptions);
  }

  find(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.URL}` + id);
  }
}
