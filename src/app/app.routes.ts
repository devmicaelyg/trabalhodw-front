import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home/home.component';
import { TipoTarefaListComponent } from './view/tipo-tarefa/tipo-tarefa-list/tipo-tarefa-list.component';
import { ProjetoListComponent } from './view/projeto/projeto-list/projeto-list.component';
import { TipoEpicoListComponent } from './view/tipo-epico/tipo-epico-list/tipo-epico-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projetos', component: ProjetoListComponent },
  { path: 'tipos-epicos', component: TipoEpicoListComponent },
  { path: 'tipos-tarefas', component: TipoTarefaListComponent },
];
