import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(
    private service: LancamentoService,
    private messageService: MessageService,
    private confirmar: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmar.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.aoExcluir(lancamento);
      }
    });
  }

  aoExcluir(lancamentoComTabela: any) {

    this.service.excluir(lancamentoComTabela[0].codigo)
      .then(() => {
        lancamentoComTabela[1].reset(),
          this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
