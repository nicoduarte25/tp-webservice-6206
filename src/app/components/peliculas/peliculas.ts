import { CommonModule } from '@angular/common';
import { OnInit, ChangeDetectorRef, Component } from '@angular/core';
import { PeliculasService } from '../../services/peliculas';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.html',
  styleUrl: './peliculas.css',
})
export class PeliculasComponent {
  listaPeliculas: any[] = [];

  constructor(
    private PeliculasService: PeliculasService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.PeliculasService.getTopMovies().subscribe({
      next: (data: any) => {
        // Guardamos la respuesta (esta API suele devolver el array directo o dentro de un objeto)
        this.listaPeliculas = data.data || data || [];
        console.log('Peliculas cargadas con éxito:', this.listaPeliculas);

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error al traer las peliculas.', err);
      },
    });
  }

}
