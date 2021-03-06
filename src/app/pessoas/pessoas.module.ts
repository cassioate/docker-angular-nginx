import { PessoasRoutingModule } from './pessoas-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { PesquisaPessoaComponent } from './pesquisa-pessoa/pesquisa-pessoa.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  PesquisaPessoaComponent,
  CadastroPessoaComponent,
  PessoasGridComponent
  ],
  imports: [
    RouterModule,

    CommonModule,
    FormsModule,

    MessagesModule,
    MessageModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule,
    PessoasRoutingModule
  ],
  exports: []
})
export class PessoasModule { }
