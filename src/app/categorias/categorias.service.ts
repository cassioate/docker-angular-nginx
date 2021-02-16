import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6NjAwMDE2MTI5MDQ5ODl9.4UoIi83C2l5nMKPIgbmJZ8Fw1SdtJ0NCGMzK4xaglu-dN453hoeEnedC9Lj3JhDuvvT4nCWV0hLy6-mhtyLMOA');

    return this.http.get(this.categoriasUrl, { headers })
      .toPromise();
  }

}
