import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextToSpeechService } from '../../services/text-to-speech';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-to-speech.html',
  styleUrls: ['./text-to-speech.css'],
})
export class TextToSpeech {
  textoAConvertir: string = '';

  // IMPORTANTE:
  // string NORMAL, NO SafeUrl
  audioUrl: string = '';

  constructor(private ttsService: TextToSpeechService) {}

  generarAudio() {
    if (!this.textoAConvertir.trim()) {
      return;
    }

    this.ttsService.convertirTexto(this.textoAConvertir).subscribe({
      next: (blob: Blob) => {
        console.log('Audio recibido:', blob);

        // Crear blob correcto
        const audioBlob = new Blob([blob], {
          type: 'audio/mpeg',
        });

        // Crear URL
        this.audioUrl = URL.createObjectURL(audioBlob);

        console.log('URL AUDIO:', this.audioUrl);
      },

      error: (err) => {
        console.error(err);

        alert('Error al generar audio');
      },
    });
  }
}
