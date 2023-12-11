export class TipoHistoriaUsuario {
  Id?: string
  Descricao: string;
  Tipo_epico_id: string; 
  
  constructor(descricao: string, tipo_epico_id: string, id?: string){
    this.Descricao = descricao;
    this.Tipo_epico_id = tipo_epico_id;
    this.Id = id
  }

  get descricao(): string{
    return this.Descricao
  }

  get id(): string | undefined {
    return this.Id;
  }

}