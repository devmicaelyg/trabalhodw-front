import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoEpicoComponent } from './tipo-epico/tipo-epico.component';
import { TipoEpicoListComponent } from './tipo-epico-list/tipo-epico-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TipoEpicoService } from './service/tipo-epico.service';
import { NotificacaoService } from '../../services/notificacao.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule, 
    MatIconModule, 
    MatTooltipModule   
  ]
  
})
export class TipoEpicoModule { }
