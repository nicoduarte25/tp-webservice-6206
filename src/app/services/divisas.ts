import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Divisas {
  private apiUrl = 'https://api.apilayer.com/currency_data/live';
  //borrar el 2 
  private apiKey = 'tjYIHoTOCljh62ACudYyg0p7boUW14XX';

  constructor(private http: HttpClient) {}

  convertir(monedaOrigen: string, monedaDestino: string) {
    const headers = new HttpHeaders({
      apikey: this.apiKey,
    });

    const params = new HttpParams().set('source', monedaOrigen).set('currencies', monedaDestino);

    return this.http.get(this.apiUrl, {
      headers,
      params,
    });
  }
}

