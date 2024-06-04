import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/clientes/login';

  constructor(private http: HttpClient) { }

  login(cpf: string, senha: string): Observable<any> {
    const body = { cpf: cpf, senha: senha };
    return this.http.post<any>(this.baseUrl, body);
  }
}