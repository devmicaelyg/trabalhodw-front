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
import { TipoHistoriaUsuarioService } from '../service/tipo-historia-usuario.service';
import { TipoEpicoService } from '../../tipo-epico/service/tipo-epico.service';
import { TipoHistoriaUsuario } from '../model/TipoHistoriaUsuario';
import { MatSelectModule } from '@angular/material/select';
import { TipoEpico } from '../../tipo-epico/model/TipoEpico';
import { TipoHistoriaUsuarioOutput } from '../model/TipoHistoriaUsuarioOutput';

export interface DialogData {
  tipo: TipoHistoriaUsuario
}

@Component({
  selector: 'app-tipo-historia-usuario',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule],
  templateUrl: './tipo-historia-usuario.component.html',
  styleUrl: './tipo-historia-usuario.component.css',
  providers: [ TipoHistoriaUsuarioService, TipoEpicoService, NotificacaoService ]
})
export class TipoHistoriaUsuarioComponent {
  titulo: string = "Cadastro de Tipo de História de Usuário"; 
  tipoForm!: FormGroup;
  isEdit: boolean = false; 

  tiposEpico: TipoEpico[] = [];
  opcaoSelecionada: string = ''; 

  constructor( 
    public dialogRef: MatDialogRef<TipoHistoriaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private service: TipoHistoriaUsuarioService,
    private tipoEpicoService: TipoEpicoService,
    private notificacao: NotificacaoService
  ){}
     
  ngOnInit(): void {
    console.log(this.data)
    
    if(this.data.tipo != null){
      this.titulo = "Edição de Tipo de História de Usuário"
      this.getById(this.data.tipo.id)
      this.isEdit = true; 
    }

    this.form();
    this.getAllTipoEpico();
  }

  form(){
    this.tipoForm = this.fb.group({
      descricao: [null, Validators.required],
      tipoEpicoId: [null, Validators.required]
    })
  }

  cadastrar(){
    console.log(this.tipoForm)
    if(this.tipoForm.invalid){
      this.formularioInvalido();
      return; 
    }

    this.service.create(this.tipoForm.value as TipoHistoriaUsuario).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close(true)
        this.notificacao.alert("Tipo de História de Usuário cadastrado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar cadastrar o Tipo de História de Usuário. Tente novamente mais tarde!", false)
      }
    })
  }

  editar(){
    if(this.tipoForm.invalid){
      this.formularioInvalido();
      return; 
    }

    this.service.update(this.data.tipo.id, this.tipoForm.value as TipoHistoriaUsuario).subscribe({
      next:() => {
        this.dialogRef.close(true)
        this.notificacao.alert("Tipo de História de Usuário editado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar editar o Tipo de História de Usuário. Tente novamente mais tarde!", false)
      }
    })
  }

  getById(id: string | undefined){
    this.service.getById(id).subscribe({
      next: (res : TipoHistoriaUsuarioOutput) => {
        this.tipoForm.controls["descricao"].setValue(this.data.tipo.descricao)
        this.tipoForm.controls["tipoEpicoId"].setValue(res.tipoEpico.id)
        this.opcaoSelecionada = res.tipoEpico.Descricao;
      }, error: (error) => {
        this.notificacao.alert("Aconteceu um erro ao tentar buscar o Tipo de História de Usuário. Tente novamente mais tarde!", false)
      }
    })
  }

  getAllTipoEpico(){
    this.tipoEpicoService.getAll().subscribe({
      next: (response) => {
        this.tiposEpico = response;
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
