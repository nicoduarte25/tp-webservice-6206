import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiLibreService {
  // wttr.in es una API pública. Usamos ?format=j1 para que nos devuelva un JSON estructurado
  private apiUrl = 'https://wttr.in/';

  constructor(private http: HttpClient) {}

  obtenerClima(ciudad: string): Observable<any> {
    // Reemplazamos espacios por más por si escriben por ejemplo "San Salvador"
    const ciudadFormateada = encodeURIComponent(ciudad);
    return this.http.get(`${this.apiUrl}${ciudadFormateada}?format=j1`);
  }
}
