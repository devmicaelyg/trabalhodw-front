export class TipoEpico { 
  Id: string | undefined
  Descricao: string

  constructor(descricao: string, id?: string){
    this.Descricao = descricao;
    this.Id = id;
  }

  get id(){
    return this.Id;
  }

  get descricao() : string {
    return this.descricao;
  }
 
}