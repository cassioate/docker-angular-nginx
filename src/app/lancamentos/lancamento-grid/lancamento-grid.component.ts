import { LazyLoadEvent } from 'primeng/api';
import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { LancamentoFiltro } from '../lancamento.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lancamento-grid',
  templateUrl: './lancamento-grid.component.html',
  styleUrls: ['./lancamento-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() filtro = new LancamentoFiltro();
  @Input() totalRegistros = 0;

  @ViewChild('tabela') grid: Table;

  @Output() eventoMudarPagina = new EventEmitter();
  @Output() eventoExcluir = new EventEmitter();

  mudarPaginaEvento(event: LazyLoadEvent) {
    this.eventoMudarPagina.emit(event);
  }

  excluirEvento(lancamento: any) {
    this.eventoExcluir.emit([lancamento, this.grid]);
  }

}

