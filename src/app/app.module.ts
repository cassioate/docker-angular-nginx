import { CadastroPessoaComponent } from './pessoas/cadastro-pessoa/cadastro-pessoa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { PesquisaPessoaComponent } from './pessoas/pesquisa-pessoa/pesquisa-pessoa.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const rotas: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/cadastro', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PesquisaPessoaComponent },
  { path: 'pessoas/cadastro', component: CadastroPessoaComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(rotas),

    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
