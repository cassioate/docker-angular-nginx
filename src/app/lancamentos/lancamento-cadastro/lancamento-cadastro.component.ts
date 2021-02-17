import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { Lancamento, Categoria } from './../../core/model';
import { CategoriaService } from './../../categorias/categorias.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private rotaAtiva: ActivatedRoute
  ) { }

  ngOnInit() {
    const codigoLancamento = this.rotaAtiva.snapshot.params.codigo;

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number){
    this.lancamentoService.pesquisarPorId(codigo)
    .then(lanc => {
      this.lancamento = lanc;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
