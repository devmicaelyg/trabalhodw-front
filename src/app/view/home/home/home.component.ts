import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { Projeto } from '../../projeto/model/Projeto';
import { NotificacaoService } from '../../../services/notificacao.service';
import { ProjetoService } from '../../projeto/service/projeto.service';
import { EpicoService } from '../../epico/service/epico.service';
import { EpicoOutput } from '../../epico/model/EpicoOutput';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { HistoriaDeUsuario } from '../../epico/model/HistoriaDeUsuario';
import {CdkAccordionItem, CdkAccordionModule} from '@angular/cdk/accordion';
import { TarefaService } from '../../epico/service/tarefa.service';
import { Tarefa } from '../../epico/model/Tarefa';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CdkAccordionModule, DragDropModule, HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ NotificacaoService, ProjetoService, EpicoService, TarefaService ]
})
export class HomeComponent implements OnInit {
  showFiller = false;
  
  projetos: Projeto[] = [];
  epicos: EpicoOutput[] = [];
  historiasDeUsuario: HistoriaDeUsuario[] | undefined = []; 
  tarefas: Tarefa[] = []; 

  projetoSelecionado: string | undefined = undefined; 
  epicoSelecionado: string = ""; 

  constructor(
    private projetoService: ProjetoService,
    private epicoService: EpicoService,
    private tarefaService: TarefaService
  ){}

  ngOnInit(): void {
    this.getAllProjetos()
  }

  buscarEpicos(){
    this.projetoSelecionado != undefined && this.getAllEpicoByProjeto(this.projetoSelecionado)
    this.historiasDeUsuario = []
  }

  getAllProjetos(){
    this.projetoService.getAll().subscribe({
      next: (res) => {
        this.projetos = res; 
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getAllEpicoByProjeto(projetoId: string){
    this.epicoService.getByProjetoId(projetoId).subscribe({
      next: (res) => {
        this.epicos = res;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getHistoriaDeUsuario(){
    let epico = this.epicos.find(e => e.id == this.epicoSelecionado)
    this.historiasDeUsuario = epico?.historiasDeUsuario;
  }

  buscarTarefas(accordionItem: CdkAccordionItem, item: HistoriaDeUsuario){
    accordionItem.toggle()
    this.getTarefasByHistoriaDeUsuario(item.id)
  }

  getTarefasByHistoriaDeUsuario(histUsuarioId: any){
    this.tarefaService.getByProjetoId(histUsuarioId).subscribe({
      next: (res) => {
        this.tarefas = res;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
