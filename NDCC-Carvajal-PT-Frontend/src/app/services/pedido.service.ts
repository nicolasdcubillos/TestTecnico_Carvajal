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
    }).set("Authorization", "Bearer " + localStorage.getItem('userToken'))
  }
  
  getAll(): Observable<any> {
    return this.http.get(`${this.URL}/getAll`, this.httpOptions);
  }

  create(Pedido: any): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.URL}/create` ,Pedido, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/delete/${id}`, this.httpOptions);
  }

  update(id: Number, Pedido: Pedido): Observable<Pedido> {
  return this.http.put<Pedido>(`${this.URL}/update/` + id, Pedido, this.httpOptions);
  }

  find(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.URL}/getById` + id, this.httpOptions);
  }
}
