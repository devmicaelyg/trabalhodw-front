import { HistoriaDeUsuario } from './HistoriaDeUsuario';
import { Projeto } from "../../projeto/model/Projeto";
import { TipoEpico } from "../../tipo-epico/model/TipoEpico";
import { Categoria } from "./Categoria";
import { TipoPrioridade } from "./TipoPrioridade";

export class EpicoOutput { 
  Id?: string
  Titulo: string;
  Descricao: string;
  Relevancia: TipoPrioridade;
  Categoria: Categoria; 
  TipoEpico: TipoEpico;
  Projeto: Projeto; 
  HistoriasDeUsuario: HistoriaDeUsuario[]; 

  constructor(titulo: string, descricao: string, relevancia: TipoPrioridade, categoria: Categoria, 
    tipoEpico: TipoEpico, projeto: Projeto, historiaDeusuario: HistoriaDeUsuario[], id?: string){
    this.Titulo = titulo;
    this.Descricao = descricao;
    this.Relevancia = relevancia;
    this.Categoria = categoria;
    this.TipoEpico = tipoEpico;
    this.Projeto = projeto;
    this.HistoriasDeUsuario = historiaDeusuario;
  }

  get id(): string | undefined {
    return this.Id;
  }

  get titulo():string{
    return this.Titulo;
  }

  get descricao():string{
    return this.Descricao;
  }

  get relevancia():string{
    return this.Relevancia;
  }

  get categoria():string{
    return this.Categoria;
  }

  get tipoEpico(): TipoEpico{
    return this.TipoEpico;
  }

  get projeto(): Projeto{
    return this.Projeto;
  }

  get historiasDeUsuario(): HistoriaDeUsuario[]{
    return this.HistoriasDeUsuario;
  }
}