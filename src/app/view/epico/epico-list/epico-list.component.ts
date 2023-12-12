import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicoOutput } from '../model/EpicoOutput';
import { NotificacaoService } from '../../../services/notificacao.service';
import { EpicoService } from '../service/epico.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EpicoComponent } from '../epico/epico.component';

@Component({
  selector: 'app-epico-list',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, MatTableModule, MatIconModule, MatTooltipModule ],
  templateUrl: './epico-list.component.html',
  styleUrl: './epico-list.component.css',
  providers: [ EpicoService, NotificacaoService ]
})
export class EpicoListComponent implements OnInit{
  epicos: EpicoOutput[] = [];
  
  constructor(
    private notificacao: NotificacaoService,
    private service: EpicoService,
    public dialog: MatDialog 
  ){}
  
  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.service.getAll().subscribe({
      next: (response) => {
        this.epicos = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  criar(): void {
    const dialogRef = this.dialog.open(EpicoComponent, {
      data: {tipo: null},
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  editar(epico: EpicoOutput){
    const dialogRef = this.dialog.open(EpicoComponent, {
      data: { epico }
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  deletar(tipo: EpicoOutput){
    this.service.delete(tipo.id).subscribe({
      next:(res) => {
        this.getAll()
        this.notificacao.alert("Épico deletado com sucesso!", true);
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar deletar o épico. Tente novamente mais tarde!", false)
      }
    })
  }
}
