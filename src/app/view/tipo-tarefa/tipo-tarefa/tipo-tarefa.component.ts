import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NotificacaoService } from '../../../services/notificacao.service';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { TipoEpico } from '../../tipo-epico/model/TipoEpico';
import { TipoTarefa } from '../model/TipoTarefa';
import { TipoTarefaService } from '../service/tipo-tarefa.service';
import { TipoHistoriaUsuarioService } from '../../tipo-historia-usuario/service/tipo-historia-usuario.service';
import { TipoTarefaOutput } from '../model/TipoTarefaOutput';
import { TipoHistoriaUsuario } from '../../tipo-historia-usuario/model/TipoHistoriaUsuario';
import { TipoHistoriaUsuarioOutput } from '../../tipo-historia-usuario/model/TipoHistoriaUsuarioOutput';

export interface DialogData {
  tipo: TipoTarefa
}

@Component({
  selector: 'app-tipo-tarefa',
  templateUrl: './tipo-tarefa.component.html',
  styleUrl: './tipo-tarefa.component.css',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule],
  providers: [ TipoTarefaService, TipoHistoriaUsuarioService, NotificacaoService]
})
export class TipoTarefaComponent implements OnInit {
  titulo: string = "Cadastro de Tipo de Tarefa"; 
  tipoForm!: FormGroup;
  isEdit: boolean = false; 

  tiposHistoriaUsuario: TipoHistoriaUsuarioOutput[] = [];


  constructor( 
    public dialogRef: MatDialogRef<TipoTarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private histUsuarioService: TipoHistoriaUsuarioService,
    private notificacao: NotificacaoService,
    private service: TipoTarefaService
  ){}
     
  ngOnInit(): void {
    console.log(this.data)
    
    if(this.data.tipo != null){
      this.titulo = "Edição de Tipo de Tarefa"
      this.getById(this.data.tipo.id)
      this.isEdit = true; 
    }

    this.form();
    this.getAllTipoEpico();
  }

  form(){
    this.tipoForm = this.fb.group({
      descricao: [null, Validators.required],
      tipoHistoriaUsuarioId: [null, Validators.required]
    })
  }

  cadastrar(){
    console.log(this.tipoForm)
    if(this.tipoForm.invalid){
      this.formularioInvalido();
      return; 
    }

    this.service.create(this.tipoForm.value as TipoTarefa).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close(true)
        this.notificacao.alert("Tipo de Tarefa cadastrado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar cadastrar o Tipo de Tarefa. Tente novamente mais tarde!", false)
      }
    })
  }

  editar(){
    if(this.tipoForm.invalid){
      this.formularioInvalido();
      return; 
    }

    this.service.update(this.data.tipo.id, this.tipoForm.value as TipoTarefa).subscribe({
      next:() => {
        this.dialogRef.close(true)
        this.notificacao.alert("Tipo de Tarefa editado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar editar o Tipo de Tarefa. Tente novamente mais tarde!", false)
      }
    })
  }

  getById(id: string | undefined){
    this.service.getById(id).subscribe({
      next: (res : TipoTarefaOutput) => {
        this.tipoForm.controls["descricao"].setValue(this.data.tipo.descricao)
        this.tipoForm.controls["tipoHistoriaUsuarioId"].setValue(res.tipoHistoriaUsuario.id)
      }, error: (error) => {
        this.notificacao.alert("Aconteceu um erro ao tentar buscar o Tipo de Tarefa. Tente novamente mais tarde!", false)
      }
    })
  }

  getAllTipoEpico(){
    this.histUsuarioService.getAll().subscribe({
      next: (response) => {
        this.tiposHistoriaUsuario = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onNoClick(): void {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Se você fechar agora todos os dados serão perdidos. Tem certeza que deseja continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      } 
    }); 
  }

  formularioInvalido(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos os campos do formulário são obrigatórios.",
    });
  }
}
