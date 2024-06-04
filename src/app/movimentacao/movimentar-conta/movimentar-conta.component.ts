import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movimentar-conta',
  templateUrl: './movimentar-conta.component.html',
  styleUrls: ['./movimentar-conta.component.css']
})
export class MovimentarContaComponent implements OnInit {
  movimentacao: any = {
    idContaOrigem: 0,
    idContaDestino: 0,
    valor: 0,
    dataMovimentacao: new Date().toISOString(),
    descricao: ''
  };
  movimentacaoConcluida: boolean = false;
  erroMovimentacao: string = '';

  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movimentacao.idContaOrigem = params['id'] || null;
      this.movimentacao.idContaOrigem = parseInt(this.movimentacao.idContaOrigem, 10);
    });
  }

  realizarMovimentacao() {
    if (this.movimentacao.idContaOrigem === this.movimentacao.idContaDestino) {
      this.erroMovimentacao = 'Não é possível transferir para sua própria conta.';
      this.movimentacaoConcluida = true;
      return;
    }
    
    this.movimentacao.dataMovimentacao = new Date().toISOString();

    this.http.post<any>('http://localhost:8080/movimentacoes', this.movimentacao)
      .subscribe(response => {
        console.log('Resposta da movimentação:', response);
        if (response.sucesso === true) {
          this.movimentacaoConcluida = true;
          this.erroMovimentacao = '';
        } else {
          this.erroMovimentacao = 'Não foi possível realizar a movimentação';
          this.movimentacaoConcluida = true;
        }
      }, error => {
        console.error('Erro ao realizar movimentação:', error);
      });
  }

  voltar() {
    this.location.back();
  }

  novaMovimentacao() {
    this.movimentacao = {
      contaOrigem: 0,
      contaDestino: 0,
      valor: 0,
      dataMovimentacao: new Date().toISOString(),
      descricao: ''
    };
    this.movimentacaoConcluida = false;
    this.erroMovimentacao = '';
  }
}
