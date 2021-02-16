import { Pessoa } from './../../core/model';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


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
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    console.log(this.pessoa);
  }

  salvarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.messageService.add({severity: 'success', detail: 'Pessoa adicionada com sucesso'});

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
