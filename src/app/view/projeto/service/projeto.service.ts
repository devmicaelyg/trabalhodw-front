import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projeto } from '../model/Projeto';

@Injectable({
  providedIn: 'root',
})
export class ProjetoService {

  private url = 'http://localhost:8080/projeto'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Projeto[]>{
    return this.http.get<Projeto[]>(`${this.url}/all`);
  }

  getById(id: string | undefined): Observable<Projeto[]>{
    return this.http.get<Projeto[]>(`${this.url}?Id=${id}`);
  }

  create(model: Projeto): Observable<Projeto>{
    return this.http.post<Projeto>(this.url, model)
  }

  delete(id: string | undefined){
    return this.http.delete(`${this.url}?Id=${id}`)
  }

  update(id: string | undefined, model: Projeto): Observable<Projeto>{
    return this.http.put<Projeto>(`${this.url}?Id=${id}`, model)
  }
  
}
