import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Projeto } from '../model/Projeto';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProjetoService } from '../service/projeto.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificacaoService } from '../../../services/notificacao.service';

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
  isLoading = false;

  constructor( 
    public dialogRef: MatDialogRef<ProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Projeto,
    private fb: FormBuilder,
    private projetoService:ProjetoService,
    private notificacao: NotificacaoService
  ){}
     
  ngOnInit(): void {
    console.log(this.data)
    this.form();
  }

  form(){
    this.projetoForm = this.fb.group({
      nome: [null, Validators.required],
      descricao: [null, Validators.required]
    })
  }

  Cadastrar(){
    console.log(this.projetoForm.value)
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
