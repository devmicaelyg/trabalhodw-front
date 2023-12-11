import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from '../../../services/notificacao.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TipoTarefaOutput } from '../model/TipoTarefaOutput';
import { TipoTarefaService } from '../service/tipo-tarefa.service';
import { TipoTarefaComponent } from '../tipo-tarefa/tipo-tarefa.component';


@Component({
  selector: 'app-tipo-tarefa-list',
  templateUrl: './tipo-tarefa-list.component.html',
  styleUrl: './tipo-tarefa-list.component.css',
  imports: [ CommonModule, HttpClientModule, MatTableModule, MatIconModule, MatTooltipModule ],
  standalone: true,
  providers: [ TipoTarefaService, NotificacaoService ]
})
export class TipoTarefaListComponent implements OnInit {
  tipos: TipoTarefaOutput[] = [];
  
  constructor(
    private notificacao: NotificacaoService,
    private service: TipoTarefaService,
    public dialog: MatDialog 
  ){}
  
  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.service.getAll().subscribe({
      next: (response) => {
        this.tipos = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  criar(): void {
    const dialogRef = this.dialog.open(TipoTarefaComponent, {
      data: {tipo: null},
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  editar(tipo: TipoTarefaOutput){
    const dialogRef = this.dialog.open(TipoTarefaComponent, {
      data: {tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  deletar(tipo: TipoTarefaOutput){
    this.service.delete(tipo.id).subscribe({
      next:(res) => {
        this.getAll()
        this.notificacao.alert("Tipo de épico cadastrado com sucesso!", true);
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar deletar o tipo de épico. Tente novamente mais tarde!", false)
      }
    })
  }
}
