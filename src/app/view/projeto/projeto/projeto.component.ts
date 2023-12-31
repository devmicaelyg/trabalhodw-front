import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Projeto } from '../model/Projeto';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjetoService } from '../service/projeto.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificacaoService } from '../../../services/notificacao.service';
import Swal from 'sweetalert2';

export interface DialogData {
  projeto: Projeto
}

@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.css',
  providers: [ ProjetoService, NotificacaoService ]
})
export class ProjetoComponent implements OnInit {
  
  titulo: string = "Cadastro de Projeto"; 
  projetoForm!: FormGroup;
  isEdit: boolean = false; 

  constructor( 
    public dialogRef: MatDialogRef<ProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private projetoService:ProjetoService,
    private notificacao: NotificacaoService
  ){}
     
  ngOnInit(): void {
    if(this.data.projeto != null){
      this.titulo = "Edição de Projeto"
      this.getById(this.data.projeto.id)
      this.isEdit = true; 
    }

    this.form();
  }

  form(){
    this.projetoForm = this.fb.group({
      nome: [null, Validators.required],
      descricao: [null, Validators.required]
    })
  }

  cadastrar(){
    if(this.projetoForm.invalid){
      this.formularioInvalido()
      return
    }

    this.projetoService.create(this.projetoForm.value as Projeto).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close(true)
        this.notificacao.alert("Projeto cadastrado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar cadastrar o projeto. Tente novamente mais tarde!", false)
      }
    })
  }

  editar(){
    if(this.projetoForm.invalid){
      this.formularioInvalido()
      return
    }
    
    this.projetoService.update(this.data.projeto.id, this.projetoForm.value as Projeto).subscribe({
      next:() => {
        this.dialogRef.close(true)
        this.notificacao.alert("Projeto editado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar editar o projeto. Tente novamente mais tarde!", false)
      }
    })
  }

  getById(id: string | undefined){
    console.log(id);
    this.projetoService.getById(id).subscribe({
      next: (res) => {
        this.projetoForm.controls["nome"].setValue(this.data.projeto.nome)
        this.projetoForm.controls["descricao"].setValue(this.data.projeto.descricao)
      }, error: (error) => {
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
