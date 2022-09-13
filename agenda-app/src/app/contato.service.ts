import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contato } from './contato/contato'
import { environment } from '../environments/environment'
import { PaginaContato } from './contato/paginaContato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  apiURL: string = environment.apiURLBase;

  constructor(private http: HttpClient) {}

  save(contato: Contato) : Observable<Contato> {
    return this.http.post<Contato>(this.apiURL, contato);
  }

  list(page: number, pageSize: number) : Observable<PaginaContato> {
    const params = new HttpParams()
        .set('page', page)
        .set('size', pageSize)
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  favorite(contato: Contato) : Observable<any> {
    /* path pois a atualização é parcial (apenas uma propriedade) */
    return this.http.patch(`${this.apiURL}/${contato.id}/favorito`, null);
  }

  upload(contato: Contato, formData: FormData) : Observable<any> {
    return this.http.put(`${this.apiURL}/${contato.id}/foto`, formData, { responseType : 'blob' });
  }
}
