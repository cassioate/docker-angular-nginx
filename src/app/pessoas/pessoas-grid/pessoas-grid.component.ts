import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() filtro = new PessoaFiltro();
  @Input() totalRegistros = 0;

  @ViewChild('tabela') grid: Table;

  @Output() eventoMudarPagina = new EventEmitter();
  @Output() eventoExcluir = new EventEmitter();
  @Output() eventoAtualizarStatus = new EventEmitter();

  mudarPagina(event: LazyLoadEvent) {
    this.eventoMudarPagina.emit(event);
  }

  excluirEvento(pessoa: any) {
    this.eventoExcluir.emit([pessoa, this.grid]);
  }

  atualiarStatusEvento(pessoa: any){
    this.eventoAtualizarStatus.emit(pessoa);
  }

}
