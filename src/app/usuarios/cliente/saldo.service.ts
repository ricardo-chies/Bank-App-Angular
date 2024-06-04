import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  private apiUrl = 'http://localhost:8080/contas/';

  constructor(private http: HttpClient) {}

  buscarSaldo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }
}
