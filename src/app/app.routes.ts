import { Routes } from '@angular/router';
import { PeliculasComponent } from './components/peliculas/peliculas';
import { CardMakerComponent } from './components/card-maker/card-maker';
import { Conversor } from './components/conversor/conversor';
import { TextToSpeech } from './components/text-to-speech/text-to-speech';
import { ApiLibre } from './components/api-libre/api-libre';

export const routes: Routes = [
  { path: 'peliculas', component: PeliculasComponent},
  { path: 'card-maker', component: CardMakerComponent },
  { path: 'conversor', component: Conversor },
  { path: 'text-to-speech', component: TextToSpeech },
  { path: 'api-libre', component: ApiLibre },
  { path: '', redirectTo: '/peliculas', pathMatch: 'full' },
  { path: '**', redirectTo: '/peliculas' },
];
