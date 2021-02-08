import { LazyLoadEvent } from 'primeng/api';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-grid',
  templateUrl: './lancamento-grid.component.html',
  styleUrls: ['./lancamento-grid.component.css']
})
export class LancamentosGridComponent{

  @Input() lancamentos = [];
  @Input() filtro = new LancamentoFiltro();
  @Input() totalRegistros = 0;

  @Output() evento = new EventEmitter();

  mudarPagina(event: LazyLoadEvent) {
    this.evento.emit(event);
  }

}

