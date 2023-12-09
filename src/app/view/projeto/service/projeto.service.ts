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

  getById(id: string): Observable<Projeto[]>{
    return this.http.get<Projeto[]>(`${this.url}/${id}`);
  }

  create(model: Projeto): Observable<Projeto>{
    return this.http.post<Projeto>(this.url, model)
  }

  //projeto?Id=5ac6549a-d9c7-42cc-a7aa-b106f56c8c7b

  delete(id: string | undefined){
    return this.http.delete(`${this.url}?Id=${id}`)
  }

  update(id: string, model: Projeto): Observable<Projeto>{
    return this.http.put<Projeto>(`${this.url}/${id}`, model)
  }
  
}
