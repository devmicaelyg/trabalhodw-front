import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoEpico } from '../model/TipoEpico';
import { TipoEpicoService } from '../service/tipo-epico.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from '../../../services/notificacao.service';
import { TipoEpicoComponent } from '../tipo-epico/tipo-epico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  imports: [ CommonModule, HttpClientModule, MatTableModule, MatIconModule, MatTooltipModule ],
  selector: 'app-tipo-epico-list',
  templateUrl: './tipo-epico-list.component.html',
  styleUrl: './tipo-epico-list.component.css',
  providers: [ TipoEpicoService, NotificacaoService ]
})
export class TipoEpicoListComponent implements OnInit {
  tipos: TipoEpico[] = [];
  
  constructor(
    private service: TipoEpicoService,
    private notificacao: NotificacaoService,
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
    const dialogRef = this.dialog.open(TipoEpicoComponent, {
      data: {tipo: null},
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  editar(tipo: TipoEpico){
    const dialogRef = this.dialog.open(TipoEpicoComponent, {
      data: {tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  deletar(tipo: TipoEpico){
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
