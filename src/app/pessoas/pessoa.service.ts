import { Pessoa } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI5MDQ5ODl9.4UoIi83C2l5nMKPIgbmJZ8Fw1SdtJ0NCGMzK4xaglu-dN453hoeEnedC9Lj3JhDuvvT4nCWV0hLy6-mhtyLMOA');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then(
        response => response['content']);
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ');

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    console.log(params);
    return this.http.get(`${this.pessoasUrl}`, { headers, params })
      .toPromise()
      .then(response => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  pesquisarPorId(codigo: number): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ');

    const resultado = this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const pessoa = response;
        return pessoa;
      });

    console.log(resultado);
    return resultado;
  }

  atualizarStatus(codigo: number, ativo: boolean) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ')
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(response => {
        const pessoa = response;
        return pessoa;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ')

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise().then(() => null);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ')
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa, { headers })
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI4Mjg1MjB9.W5jTH52OruaABJ6I4uDmGwP9mPrtAXuXAR4n8SY6FSZnR3b4EXrpI9x6wUQ1m0DRxJ0KqmpIP_Xgx45CcxwmYQ')
      .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
      .toPromise()
      .then(response => {
        const pessoa = response;
        return pessoa;
      });
    }
  }
