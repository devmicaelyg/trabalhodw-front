export class TipoTarefa {
  Id?: string
  Descricao: string;
  Tipo_historia_usuario_id: string; 
  
  constructor(descricao: string, Tipo_historia_usuario_id: string, id?: string){
    this.Descricao = descricao;
    this.Tipo_historia_usuario_id = Tipo_historia_usuario_id;
    this.Id = id
  }

  get descricao(): string{
    return this.Descricao
  }

  get id(): string | undefined {
    return this.Id;
  }
}