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
import { EpicoService } from '../service/epico.service';
import { TipoEpicoService } from '../../tipo-epico/service/tipo-epico.service';
import { Epico } from '../model/Epico';
import { TipoEpico } from '../../tipo-epico/model/TipoEpico';
import { ProjetoService } from '../../projeto/service/projeto.service';
import { Projeto } from '../../projeto/model/Projeto';
import { MatSelectModule } from '@angular/material/select';
import { TipoPrioridade } from '../model/TipoPrioridade';
import { Categoria } from '../model/Categoria';
import { EpicoOutput } from '../model/EpicoOutput';

export interface DialogData {
  epico: EpicoOutput
}

export interface EnumModel {
  id: string
  descricao: string
}

@Component({
  selector: 'app-epico',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule],
  templateUrl: './epico.component.html',
  styleUrl: './epico.component.css',
  providers: [ EpicoService, NotificacaoService, EpicoService, TipoEpicoService, ProjetoService]
})
export class EpicoComponent implements OnInit {
  titulo: string = "Cadastro de Épico"; 
  epicoForm!: FormGroup;
  isEdit: boolean = false; 

  tiposEpico: TipoEpico[] = [];
  projetos: Projeto[] = [];
  tiposPrioridade: EnumModel[] = [];
  categorias: EnumModel[] = [];

  constructor( 
    public dialogRef: MatDialogRef<EpicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private tipoEpicoService: TipoEpicoService,
    private service: EpicoService,
    private projetoService: ProjetoService,
    private notificacao: NotificacaoService
  ){}
     
  ngOnInit(): void {
    if(this.data.epico != null){
      this.titulo = "Edição de Épico"
      this.getById(this.data.epico.id)
      this.isEdit = true; 
    }

    console.log(this.data.epico)

    this.form();
    this.getAllProjeto();
    this.getAllTipoEpico();
    this.getAllCategoria();
    this.getAllTipoPrioridade();
  }

  form(){
    this.epicoForm = this.fb.group({
      titulo: [null, Validators.required],
      descricao: [null, Validators.required],
      relevancia: [null, Validators.required],
      categoria: [null, Validators.required],
      tipoEpicoId: [null, Validators.required],
      projetoId: [null, Validators.required]
    })
  }

  cadastrar(){
    if(this.epicoForm.invalid){
      this.formularioInvalido()
      return
    }

    this.service.create(this.epicoForm.value as Epico).subscribe({
      next: (res) => {
        console.log(res)
        this.dialogRef.close(true)
        this.notificacao.alert("Epico cadastrado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar cadastrar o Epico. Tente novamente mais tarde!", false)
      }
    })
  }

  editar(){
    if(this.epicoForm.invalid){
      this.formularioInvalido()
      return
    }
    
    this.service.update(this.data.epico.id, this.epicoForm.value as Epico).subscribe({
      next:() => {
        this.dialogRef.close(true)
        this.notificacao.alert("Epico editado com sucesso!", true)
      },
      error: (error) => {
        console.log(error)
        this.notificacao.alert("Aconteceu um erro ao tentar editar o Epico. Tente novamente mais tarde!", false)
      }
    })
  }

  getById(id: string | undefined){
    this.service.getById(id).subscribe({
      next: (res) => {
        this.epicoForm.controls["titulo"].setValue(this.data.epico.titulo)
        this.epicoForm.controls["descricao"].setValue(this.data.epico.descricao)
        this.epicoForm.controls["tipoEpicoId"].setValue(this.data.epico.tipoEpico.id)
        this.epicoForm.controls["projetoId"].setValue(this.data.epico.projeto.id)
        this.epicoForm.controls["categoria"].setValue(this.data.epico.categoria)
        this.epicoForm.controls["relevancia"].setValue(this.data.epico.relevancia)
      }, error: (error) => {
        console.log(error)
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

  getAllProjeto(){
    this.projetoService.getAll().subscribe({
      next: (response) => {
        this.projetos = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getAllTipoPrioridade(){
    this.tiposPrioridade.push(
      {
        id: "ALTA", 
        descricao: TipoPrioridade.Alta
      }, 
      {
        id: "BAIXA", 
        descricao: TipoPrioridade.Baixa
      },
      {
        id: "NORMAL", 
        descricao: TipoPrioridade.Normal
      },
      {
        id: "URGENTE", 
        descricao: TipoPrioridade.Urgente
      }
    )
  }

  getAllCategoria(){
    this.categorias.push(
      {
        id: "NEGOCIO", 
        descricao: Categoria.Negocio
      },
      {
        id: "DESENVOLVIMENTO", 
        descricao: Categoria.Desenvolviumento
      }
    )
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
