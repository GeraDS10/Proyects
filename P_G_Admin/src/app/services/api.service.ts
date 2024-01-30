import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IValues } from '../models/values.model';
import { IEstadia } from '../models/estadia.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'https://64e0b77950713530432c98b8.mockapi.io/api/peluqueria/Peluqueria';
  private baseURLGuarderia = 'https://64e0b77950713530432c98b8.mockapi.io/api/peluqueria/Guarderia';

  constructor(private _httpCliente: HttpClient) { }

  public getAllValues(sort?: string): Observable <IValues[]>{
    const params = sort ? `?sort=${sort}` : '';
    return this._httpCliente.get<IValues[]>(`${this.baseURL}${params}`);
  }

  public getValueById(id: string): Observable<IValues>{
    return this._httpCliente.get<IValues>(`${this.baseURL}/${id}`);
  }

  public updateValue(id: string, value : IValues): Observable<IValues>{
    return this._httpCliente.put<IValues>(`${this.baseURL}/${id}`, value);
  }

  public getValorEstadia(id: string): Observable<IEstadia>{
    return this._httpCliente.get<IEstadia>(`${this.baseURLGuarderia}/${id}`);
  }

  
  public updateValueEstadia(id: string, value : IEstadia): Observable<IEstadia>{
    return this._httpCliente.put<IEstadia>(`${this.baseURLGuarderia}/${id}`, value);
  }
}
