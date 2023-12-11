enum StatusTarefa {
  Aguardando = 'AGUARDANDO',
  EmAndamento = 'EM_ANDAMENTO',
  Concluida = 'CONCLUIDA'
}

export class Tarefa {
  private Id: string;
  private Titulo: string;
  private Descricao: string;
  private StatusTarefa: StatusTarefa;
  private HistoriaDeUsuarioId: string;
  private Dependencias: string[];

  constructor(
    id: string,
    titulo: string,
    descricao: string,
    statusTarefa: StatusTarefa,
    historiaDeUsuarioId: string,
    dependencias: string[]
  ) {
    this.Id = id;
    this.Titulo = titulo;
    this.Descricao = descricao;
    this.StatusTarefa = statusTarefa;
    this.HistoriaDeUsuarioId = historiaDeUsuarioId;
    this.Dependencias = dependencias;
  }

  // Getters
  get id(): string {
    return this.Id;
  }

  get titulo(): string {
    return this.Titulo;
  }

  get descricao(): string {
    return this.Descricao;
  }

  get statusTarefa(): StatusTarefa {
    return this.StatusTarefa;
  }

  get historiaDeUsuarioId(): string {
    return this.HistoriaDeUsuarioId;
  }

  get dependencias(): string[] {
    return this.Dependencias;
  }
}
