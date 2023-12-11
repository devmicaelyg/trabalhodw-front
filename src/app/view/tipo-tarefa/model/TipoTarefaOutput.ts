import { TipoHistoriaUsuario } from "../../tipo-historia-usuario/model/TipoHistoriaUsuario";

export class TipoTarefaOutput {
  Id?: string
  Descricao: string;
  TipoHistoriaUsuario: TipoHistoriaUsuario; 
  
  constructor(descricao: string, TipoHistoriaUsuario: TipoHistoriaUsuario, id?: string){
    this.Descricao = descricao;
    this.TipoHistoriaUsuario = TipoHistoriaUsuario;
    this.Id = id
  }

  get descricao(): string{
    return this.Descricao
  }

  get id(): string | undefined {
    return this.Id;
  }

  get tipoHistoriaUsuario(): TipoHistoriaUsuario {
    return this.TipoHistoriaUsuario;
  }

}