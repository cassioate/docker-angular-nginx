import { Title } from '@angular/platform-browser';
import { Pessoa } from './../../core/model';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private rotaAtiva: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de pessoa');
    const codigoPessoa = this.rotaAtiva.snapshot.params.codigo;

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.pesquisarPorId(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.salvarPessoa(form);
    }
  }

  salvarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(pessoa => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso' });

        // form.reset();
        // this.pessoa = new Pessoa();
        this.router.navigate(['pessoas', pessoa.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {

    form.reset();

    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1);


    this.router.navigate(['pessoas/cadastro']);
  }

  atualizarTitulo(){
    this.title.setTitle(`Editar pessoa: ${this.pessoa.nome}`);
  }

}
