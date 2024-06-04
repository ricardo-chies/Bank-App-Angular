import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './usuarios/cliente/cliente.component';
import { MovimentarContaComponent } from './movimentacao/movimentar-conta/movimentar-conta.component';
import { ExtratoContaComponent } from './movimentacao/extrato-conta/extrato-conta.component';
import { CriarContaBancariaComponent } from './conta-bancaria/criar-conta-bancaria/criar-conta-bancaria.component';

const routes: Routes = [
  { path: '', redirectTo: '/criar-conta-bancaria', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'movimentar-conta/:id', component: MovimentarContaComponent },
  { path: 'extrato-conta/:id', component: ExtratoContaComponent },
  { path: 'criar-conta-bancaria', component: CriarContaBancariaComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
