import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  private apiUrl = 'https://open-ai-text-to-speech1.p.rapidapi.com/';

  // PONÉ TU API KEY
  private apiKey = 'fe8d9db909mshf3b69500a037561p1bf5ecjsnec04273b2be2';

  constructor(private http: HttpClient) {}

  convertirTexto(texto: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey,
    });

    const body = {
      model: 'tts-1',
      input: texto,
      voice: 'alloy',
    };

    return this.http.post(this.apiUrl, body, {
      headers,
      responseType: 'blob',
    });
  }
}
