import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutosService {
  private baseUrl = 'https://car-specs.p.rapidapi.com/v2/cars';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      //cambias al ultimo poner un 2
      'x-rapidapi-key': 'fe8d9db909mshf3b69500a037561p1bf5ecjsnec04273b2be2',
      'x-rapidapi-host': 'car-specs.p.rapidapi.com',
    });
  }

  // 1. Obtener todas las marcas usando la URL exacta de tu captura
  getMarcas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/makes`, { headers: this.getHeaders() });
  }

  // 2. Obtener los modelos pasándole el ID de la marca
  ModelosPorMarca(makeId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/makes/${makeId}/models`, {
      headers: this.getHeaders(),
    });
  }
}
