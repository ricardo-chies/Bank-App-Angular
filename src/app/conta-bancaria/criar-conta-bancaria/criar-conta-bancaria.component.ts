import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta-bancaria',
  templateUrl: './criar-conta-bancaria.component.html',
  styleUrls: ['./criar-conta-bancaria.component.css']
})
export class CriarContaBancariaComponent implements OnInit {
  cliente: any = {
    cpf: '',
    nomeCompleto: '',
    idade: null,
    telefone: '',
    email: '',
    senha: ''
  };

  conta: any = {
    saldo: 0,
  };

  contaConcluida: boolean = false;
  erroConta: string = '';

  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {}

  abrirConta() {
    this.http.post<any>('http://localhost:8080/clientes', this.cliente)
      .subscribe((clienteResponse) => {
        const idCliente = clienteResponse.id;
  
        const contaData = {
          idCliente: idCliente,
          saldo: this.conta.saldo
        };
  
        this.http.post<any>('http://localhost:8080/contas', contaData)
          .subscribe((contaResponse) => {
            console.log('Usuário e conta criados com sucesso!', clienteResponse, contaResponse);
            this.contaConcluida = true;
          }, error => {
            console.error('Erro ao criar conta:', error);
          });
      }, error => {
        console.error('Erro ao criar usuário:', error);
      });
  }

  irParaLogin() {
    // Redirecionar para a rota de login
    this.router.navigate(['/login']); // Substitua '/login' pela rota real para a tela de login
  }
}
