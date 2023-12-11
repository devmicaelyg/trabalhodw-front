import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoHistoriaUsuario } from '../model/TipoHistoriaUsuario';
import { Observable } from 'rxjs';
import { TipoHistoriaUsuarioOutput } from '../model/TipoHistoriaUsuarioOutput';

@Injectable({
  providedIn: 'root'
})
export class TipoHistoriaUsuarioService {
  
  private url = 'http://localhost:8080/tipohistoriausuario'
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoHistoriaUsuarioOutput[]>{
    return this.http.get<TipoHistoriaUsuarioOutput[]>(`${this.url}/all`);
  }

  getById(id: string | undefined): Observable<TipoHistoriaUsuarioOutput>{
    return this.http.get<TipoHistoriaUsuarioOutput>(`${this.url}?Id=${id}`);
  }

  create(model: TipoHistoriaUsuario): Observable<TipoHistoriaUsuario>{
    return this.http.post<TipoHistoriaUsuario>(this.url, model)
  }

  delete(id: string | undefined){
    return this.http.delete(`${this.url}?Id=${id}`)
  }

  update(id: string | undefined, model: TipoHistoriaUsuario): Observable<TipoHistoriaUsuario>{
    return this.http.put<TipoHistoriaUsuario>(`${this.url}?Id=${id}`, model)
  }
}
