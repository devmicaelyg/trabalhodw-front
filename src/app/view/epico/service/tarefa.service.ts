import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefa } from '../model/Tarefa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private url = 'http://localhost:8080/tarefa'

  constructor(
    private http: HttpClient
  ) { }

  getByProjetoId(id: string | undefined): Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(`${this.url}/historiaDeUsuario?Id=${id}`);
  }
}
