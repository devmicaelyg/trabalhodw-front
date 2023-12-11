import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoTarefa } from '../model/TipoTarefa';
import { TipoTarefaOutput } from '../model/TipoTarefaOutput';

@Injectable({
  providedIn: 'root'
})
export class TipoTarefaService {
  private url = 'http://localhost:8080/tipotarefa'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<TipoTarefaOutput[]>{
    return this.http.get<TipoTarefaOutput[]>(`${this.url}/all`);
  }

  getById(id: string | undefined): Observable<TipoTarefaOutput>{
    return this.http.get<TipoTarefaOutput>(`${this.url}?Id=${id}`);
  }

  create(model: TipoTarefa): Observable<TipoTarefa>{
    return this.http.post<TipoTarefa>(this.url, model)
  }

  delete(id: string | undefined){
    return this.http.delete(`${this.url}?Id=${id}`)
  }

  update(id: string | undefined, model: TipoTarefa): Observable<TipoTarefa>{
    return this.http.put<TipoTarefa>(`${this.url}?Id=${id}`, model)
  }
}
