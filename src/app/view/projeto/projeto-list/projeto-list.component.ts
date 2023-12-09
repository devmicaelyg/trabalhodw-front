import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProjetoService } from '../service/projeto.service';
import { HttpClientModule } from '@angular/common/http';
import { Projeto } from '../model/Projeto';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ProjetoComponent } from '../projeto/projeto.component';
import { NotificacaoService } from '../../../services/notificacao.service';

@Component({
  selector: 'app-projeto-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, HttpClientModule, MatIconModule, MatTooltipModule],
  templateUrl: './projeto-list.component.html',
  styleUrl: './projeto-list.component.css',
  providers: [ ProjetoService, NotificacaoService ]
})
export class ProjetoListComponent implements OnInit  {

  projetos: Projeto[] = [];
  
  constructor(
    private service: ProjetoService,
    public dialog: MatDialog,
    private notificacao: NotificacaoService
  ){}
  
  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.service.getAll().subscribe({
      next: (response) => {
        this.projetos = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  criarProjeto(): void {
    const dialogRef = this.dialog.open(ProjetoComponent, {
      data: {projeto: null},
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  editarProjeto(projeto: Projeto){
    const dialogRef = this.dialog.open(ProjetoComponent, {
      data: {projeto: projeto},
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  delete(projeto: Projeto){
    this.service.delete(projeto.id).subscribe({
      next:(res) => {
        this.getAll()
        this.notificacao.alert("Projeto cadastrado com sucesso!", true);
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar deletar o projeto. Tente novamente mais tarde!", false)
      }
    })
  }
}
