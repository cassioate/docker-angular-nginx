import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { PesquisaPessoaComponent } from './pesquisa-pessoa/pesquisa-pessoa.component';

const rotas: Routes = [
  { path: 'pessoas', component: PesquisaPessoaComponent },
  { path: 'pessoas/cadastro', component: CadastroPessoaComponent },
  { path: 'pessoas/:codigo', component: CadastroPessoaComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas)
  ],
  exports: [
    RouterModule
  ]
})
export class PessoasRoutingModule { }
