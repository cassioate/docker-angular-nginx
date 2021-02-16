import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    const msg = [];

    if (typeof errorResponse === 'string') {
      msg.push(errorResponse);
    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

      try {
        errorResponse.error.forEach(element => {
          msg.push(element.mensagemUsuario);
        });
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg.push('Erro ao processar serviço remoto. Tente novamente.');
      console.error('Ocorreu um erro', errorResponse);
    }

    msg.forEach(element => {
      this.messageService.add({ severity: 'error', detail: element });
    });

  }
}
