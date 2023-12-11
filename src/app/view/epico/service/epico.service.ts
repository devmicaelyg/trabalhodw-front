import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpicoOutput } from '../model/EpicoOutput';
import { Observable } from 'rxjs';
import { Epico } from '../model/Epico';

@Injectable({
  providedIn: 'root'
})
export class EpicoService {
  private url = 'http://localhost:8080/epico'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<EpicoOutput[]>{
    return this.http.get<EpicoOutput[]>(`${this.url}/all`);
  }

  getById(id: string | undefined): Observable<EpicoOutput>{
    return this.http.get<EpicoOutput>(`${this.url}?Id=${id}`);
  }

  getByProjetoId(id: string | undefined): Observable<EpicoOutput[]>{
    return this.http.get<EpicoOutput[]>(`${this.url}/projeto?Id=${id}`);
  }

  create(model: Epico): Observable<Epico>{
    return this.http.post<Epico>(this.url, model)
  }

  delete(id: string | undefined){
    return this.http.delete(`${this.url}?Id=${id}`)
  }

  update(id: string | undefined, model: Epico): Observable<Epico>{
    return this.http.put<Epico>(`${this.url}?Id=${id}`, model)
  }
}
