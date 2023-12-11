import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoService } from '../../../services/notificacao.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TipoHistoriaUsuario } from '../model/TipoHistoriaUsuario';
import { TipoHistoriaUsuarioService } from '../service/tipo-historia-usuario.service';
import { TipoHistoriaUsuarioComponent } from '../tipo-historia-usuario/tipo-historia-usuario.component';
import { TipoHistoriaUsuarioOutput } from '../model/TipoHistoriaUsuarioOutput';

@Component({
  selector: 'app-tipo-historia-usuario-list',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, MatTableModule, MatIconModule, MatTooltipModule ],
  templateUrl: './tipo-historia-usuario-list.component.html',
  styleUrl: './tipo-historia-usuario-list.component.css',
  providers: [ TipoHistoriaUsuarioService, NotificacaoService ]
})
export class TipoHistoriaUsuarioListComponent implements OnInit {
  tipos: TipoHistoriaUsuarioOutput[] = [];
  
  constructor(
    private service: TipoHistoriaUsuarioService,
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
    const dialogRef = this.dialog.open(TipoHistoriaUsuarioComponent, {
      data: {tipo: null},
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  editar(tipo: TipoHistoriaUsuarioOutput){
    const dialogRef = this.dialog.open(TipoHistoriaUsuarioComponent, {
      data: {tipo}
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.getAll()
    });
  }

  deletar(tipo: TipoHistoriaUsuarioOutput){
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
