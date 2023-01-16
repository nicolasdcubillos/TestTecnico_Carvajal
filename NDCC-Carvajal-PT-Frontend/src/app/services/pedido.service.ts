import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {


  URL = 'https://localhost:7209/Pedido'; 
  constructor( private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  getAll(): Observable<any> {
    return this.http.get(`${this.URL}`);
  }

  create(Pedido: any): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.URL}` ,Pedido, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  }

  update(id: Number, Pedido: Pedido): Observable<Pedido> {
  return this.http.put<Pedido>(`${this.URL}/` + id, Pedido, this.httpOptions);
  }

  find(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.URL}` + id);
  }
}
