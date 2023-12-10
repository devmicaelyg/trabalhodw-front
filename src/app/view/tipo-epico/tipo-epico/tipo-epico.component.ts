import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NotificacaoService } from '../../../services/notificacao.service';
import { TipoEpico } from '../model/TipoEpico';
import { TipoEpicoService } from '../service/tipo-epico.service';
import Swal from 'sweetalert2';

export interface DialogData {
  tipo: TipoEpico
}
@Component({
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule],
  selector: 'app-tipo-epico',
  templateUrl: './tipo-epico.component.html',
  styleUrl: './tipo-epico.component.css',
  providers: [TipoEpicoService, NotificacaoService]
})
export class TipoEpicoComponent implements OnInit {
  
  titulo: string = "Cadastro de Tipo de Épico"; 
  tipoForm!: FormGroup;
  isEdit: boolean = false; 

  constructor( 
    public dialogRef: MatDialogRef<TipoEpicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private service:TipoEpicoService,
    private notificacao: NotificacaoService
  ){}
     
  ngOnInit(): void {
    console.log(this.data)
    
    if(this.data.tipo != null){
      this.titulo = "Edição de Tipo de Épico"
      this.getById(this.data.tipo.id)
      this.isEdit = true; 
    }

    this.form();
  }

  form(){
    this.tipoForm = this.fb.group({
      descricao: [null, Validators.required]
    })
  }

  cadastrar(){
    if(this.tipoForm.invalid){
      this.formularioInvalido();
      return; 
    }

    this.service.create(this.tipoForm.value as TipoEpico).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close(true)
        this.notificacao.alert("Tipo de Épico cadastrado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar cadastrar o tipo de épico. Tente novamente mais tarde!", false)
      }
    })
  }

  editar(){
    if(this.tipoForm.invalid){
      this.formularioInvalido();
      return; 
    }

    this.service.update(this.data.tipo.id, this.tipoForm.value as TipoEpico).subscribe({
      next:() => {
        this.dialogRef.close(true)
        this.notificacao.alert("Tipo de Épico editado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar editar o tipo de épico. Tente novamente mais tarde!", false)
      }
    })
  }

  getById(id: string | undefined){
    this.service.getById(id).subscribe({
      next: (res) => {
        this.tipoForm.controls["descricao"].setValue(this.data.tipo.descricao)
      }, error: (error) => {
        this.notificacao.alert("Aconteceu um erro ao tentar buscar o tipo de epico. Tente novamente mais tarde!", false)
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
