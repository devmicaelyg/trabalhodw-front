import { TipoPrioridade } from "./TipoPrioridade"

export class HistoriaDeUsuario { 
  Id?: string
  EpicoId: string
  Titulo: string
  Descricao: string
  Prioridade: TipoPrioridade
  TipoHistoriaUsuarioId
  Finalizada: boolean

  constructor(epicoId: string, titulo: string, descricao: string, prioridade: TipoPrioridade, tipoHistoriaUsuarioId: string, finalizada: boolean){
    this.EpicoId = epicoId;
    this.Titulo = titulo;
    this.Descricao = descricao;
    this.Prioridade = prioridade;
    this.TipoHistoriaUsuarioId = tipoHistoriaUsuarioId;
    this.Finalizada = finalizada;
  }

  id(): string | undefined {
    return this.Id;
  }

  getEpicoId(): string {
    return this.EpicoId;
  }

  getTitulo(): string {
    return this.Titulo;
  }

  descricao(): string {
    return this.Descricao;
  }

  getPrioridade(): TipoPrioridade {
    return this.Prioridade;
  }

  getTipoHistoriaUsuarioId(): string {
    return this.TipoHistoriaUsuarioId;
  }

  isFinalizada(): boolean {
    return this.Finalizada;
  }
}

// "id": "dc388bfe-b9ef-4b6a-8a59-86919623bf36",
// "epicoId": "cfaac1c6-3112-409e-8243-6b0586be4927",
// "titulo": "Criar Automatico",
// "descricao": "Criar rato",
// "prioridade": "URGENTE",
// "dataCriacao": 1702302412694,
// "tipoHistoriaUsuarioId": "b2f6cf54-fe45-4cd8-89ec-2e9cbae56fd3",
// "dependencias": [],
// "finalizada": false