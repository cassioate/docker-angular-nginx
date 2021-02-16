export class Lancamento {
  codigo: number;
  tipo: 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  pessoa = new Pessoa();
  categoria = new Categoria();
  observacao: string;
}

export class Categoria {
  codigo: number;
  nome: string;
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
}
