import { Lancamento } from './../core/model';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ');

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
        const lancamentos = response['content'];

        const resultado = {
          lancamentos,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ')
      .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(`${this.lancamentosUrl}`, lancamento, { headers })
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise().then(() => null);
  }

  pesquisarPorId(codigo: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ');

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const lancamento = response;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ')
      .append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
