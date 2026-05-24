import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private apiUrl = 'https://imdb-top-100-movies.p.rapidapi.com/';

  constructor(private http: HttpClient) { }

  getTopMovies(): Observable<any> {
    const headers = new HttpHeaders({
      //cambias al ultimo poner un 2
      'x-rapidapi-key': 'fe8d9db909mshf3b69500a037561p1bf5ecjsnec04273b2be2',
      'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
