import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
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

 @Output() evento = new EventEmitter();

 mudarPagina(event: LazyLoadEvent) {
   this.evento.emit(event);
 }

}
