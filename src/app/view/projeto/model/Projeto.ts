export class Projeto {
  private Id?: string
  private Nome: string
  private Descricao: string

  constructor(nome: string, descricao: string, id?: string){
    this.Id = id;
    this.Nome = nome; 
    this.Descricao = descricao;
  }

  get id(): string | undefined {
    return this.Id;
  }

  set id(value: string){
    this.Id = value
  }

  get nome(): string {
    return this.Nome;
  }

  set nome(value: string){
    this.Nome = value
  }

  get descricao(): string{
    return this.Descricao
  }

  set descricao(value: string){
    this.Descricao = value; 
  }
}