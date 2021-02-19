import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pesquisa-pessoa',
  templateUrl: './pesquisa-pessoa.component.html',
  styleUrls: ['./pesquisa-pessoa.component.css']
})
export class PesquisaPessoaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(
    private service: PessoaService,
    private messageService: MessageService,
    private confirmar: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }
  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
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

  aoExcluir(pessoaComTabela: any) {
    this.service.excluir(pessoaComTabela[0].codigo)
      .then(() => {
        pessoaComTabela[1].reset(),
          this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoAtualizarStatus(pessoa: any){
    const novoStatus = !pessoa.ativo;

    this.service.atualizarStatus(pessoa.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      pessoa.ativo = novoStatus;
      this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
    })
    .catch(erro => this.errorHandler.handle(erro));

  }
}
