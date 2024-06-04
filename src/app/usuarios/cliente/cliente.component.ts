import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaldoService } from './saldo.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  nome: string | null = null;
  id: number | null = null;
  conta: number | null = null;
  saldo: number | null = null;
  saldoOculto: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saldoService: SaldoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nome = params['nome'] || null;
      this.id = params['id'] || null;
      if (this.nome && this.id) {
        this.buscarSaldo();
      }
    });
  }

  buscarSaldo() {
    this.saldoService.buscarSaldo(this.id!).subscribe(
      (response) => {
        this.saldo = response?.saldo || null;
        this.conta = response?.conta || null;
        console.log('Saldo:', this.saldo)
      },
      (error) => {
        console.error('Erro ao buscar saldo:', error);
      }
    );
  }

  mostrarSaldo() {
    this.saldoOculto = false;
  }

  buscarExtrato() {
    if (this.id) {
      this.router.navigate(['/extrato-conta', this.id]);
    } else {
      console.error('Erro: Número da conta não disponível.');
    }
  }

  movimentarConta() {
    if (this.id) {
      this.router.navigate(['/movimentar-conta', this.id]);
    } else {
      console.error('Erro: Número do cliente não disponível.');
    }
  }
}
