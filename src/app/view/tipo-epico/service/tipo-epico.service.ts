import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoEpico } from '../model/TipoEpico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoEpicoService {

  private url = 'http://localhost:8080/tipoepico'
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoEpico[]>{
    return this.http.get<TipoEpico[]>(`${this.url}/all`);
  }

  getById(id: string | undefined): Observable<TipoEpico[]>{
    return this.http.get<TipoEpico[]>(`${this.url}?Id=${id}`);
  }

  create(model: TipoEpico): Observable<TipoEpico>{
    return this.http.post<TipoEpico>(this.url, model)
  }

  delete(id: string | undefined){
    return this.http.delete(`${this.url}?Id=${id}`)
  }

  update(id: string | undefined, model: TipoEpico): Observable<TipoEpico>{
    return this.http.put<TipoEpico>(`${this.url}?Id=${id}`, model)
  }
}
