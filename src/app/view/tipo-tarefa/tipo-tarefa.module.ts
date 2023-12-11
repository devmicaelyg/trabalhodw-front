import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoTarefaComponent } from './tipo-tarefa/tipo-tarefa.component';
import { TipoTarefaListComponent } from './tipo-tarefa-list/tipo-tarefa-list.component';
import { TipoTarefaService } from './service/tipo-tarefa.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    TipoTarefaComponent,
    TipoTarefaListComponent
  ], 
  exports: [
    TipoTarefaComponent,
    TipoTarefaListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule, 
    HttpClientModule, 
    MatIconModule, 
    MatTooltipModule
  ],
  providers: [
    TipoTarefaService
  ]
})
export class TipoTarefaModule { }
