import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home/home.component';
import { TipoTarefaListComponent } from './view/tipo-tarefa/tipo-tarefa-list/tipo-tarefa-list.component';
import { ProjetoListComponent } from './view/projeto/projeto-list/projeto-list.component';
import { TipoEpicoListComponent } from './view/tipo-epico/tipo-epico-list/tipo-epico-list.component';
import { TipoHistoriaUsuarioListComponent } from './view/tipo-historia-usuario/tipo-historia-usuario-list/tipo-historia-usuario-list.component';
import { EpicoListComponent } from './view/epico/epico-list/epico-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projetos', component: ProjetoListComponent },
  { path: 'epicos', component: EpicoListComponent },
  { path: 'tipos-epicos', component: TipoEpicoListComponent },
  { path: 'tipos-historias-usuario', component: TipoHistoriaUsuarioListComponent },
  { path: 'tipos-tarefas', component: TipoTarefaListComponent },
];
