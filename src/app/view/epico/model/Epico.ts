import { Categoria } from "./Categoria";
import { TipoPrioridade } from "./TipoPrioridade";

export class Epico { 
  Id?: string
  Titulo: string;
  Descricao: string;
  TipoPrioridade: TipoPrioridade;
  Categoria: Categoria; 
  TipoEpicoId: string;
  ProjetoId: string; 

  constructor(titulo: string, descricao: string, tipoPrioridade: TipoPrioridade, categoria: Categoria, tipoEpicoId: string, projetoId: string, id?: string){
    this.Titulo = titulo;
    this.Descricao = descricao;
    this.TipoPrioridade = tipoPrioridade;
    this.Categoria = categoria;
    this.TipoEpicoId = tipoEpicoId;
    this.ProjetoId = projetoId;
  }

  get titulo():string{
    return this.Titulo;
  }

  get descricao():string{
    return this.Descricao;
  }

  get tipoPrioridade():string{
    return this.TipoPrioridade;
  }

  get categoria():string{
    return this.Categoria;
  }

  get tipoEpicoId():string{
    return this.TipoEpicoId;
  }

  get projetoId():string{
    return this.ProjetoId;
  }
}