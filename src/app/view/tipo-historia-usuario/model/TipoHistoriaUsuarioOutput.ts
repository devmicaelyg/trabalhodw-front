import { TipoEpico } from "../../tipo-epico/model/TipoEpico";

export class TipoHistoriaUsuarioOutput {
  Id?: string
  Descricao: string;
  TipoEpico: TipoEpico; 
  
  constructor(descricao: string, tipoEpico: TipoEpico, id?: string){
    this.Descricao = descricao;
    this.TipoEpico = tipoEpico;
    this.Id = id
  }

  get descricao(): string{
    return this.Descricao
  }

  get id(): string | undefined {
    return this.Id;
  }

  get tipoEpico(): TipoEpico {
    return this.TipoEpico;
  }

}