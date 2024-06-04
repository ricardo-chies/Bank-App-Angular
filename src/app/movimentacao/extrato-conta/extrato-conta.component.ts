import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtratoContaService } from './extrato-conta.service';

@Component({
  selector: 'app-extrato-conta',
  templateUrl: './extrato-conta.component.html',
  styleUrls: ['./extrato-conta.component.css']
})
export class ExtratoContaComponent implements OnInit {
  movimentacoes: any[] = [];
  id: number | null = null;

  constructor(
    private extratoService: ExtratoContaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] || null;
      if (params['id']) {
        this.buscarExtratoConta();
      }
      else{
        console.log('vazio')
      }
    });
  }

  buscarExtratoConta() {
    if (!this.id) {
      console.error('Erro: Número da conta não fornecido.');
      return;
    }

    this.extratoService.buscarExtratoConta(this.id)
      .subscribe(
        (response: any[]) => {
          this.movimentacoes = response;
        },
        (error: any) => {
          console.error('Erro ao buscar extrato:', error);
        }
      );
  }
}