import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { Lancamento, Categoria } from './../../core/model';
import { CategoriaService } from './../../categorias/categorias.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { Title } from '@angular/platform-browser';

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
    private rotaAtiva: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo lançamento');
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

  carregarLancamento(codigo: number) {
    this.lancamentoService.pesquisarPorId(codigo)
      .then(lanc => {
        this.lancamento = lanc;
        this.atualizarTitulo();
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
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
      .then(lancamento => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['lancamentos', lancamento.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;

        this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);


    this.router.navigate(['lancamentos/cadastro']);
  }

  atualizarTitulo(){
    this.title.setTitle(`Editar lançamento: ${this.lancamento.descricao}`);
  }

}
