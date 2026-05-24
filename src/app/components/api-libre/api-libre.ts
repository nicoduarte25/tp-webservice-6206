import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiLibreService } from '../../services/api-libre';

@Component({
  selector: 'app-api-libre',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './api-libre.html',
  styleUrl: './api-libre.css',
})
export class ApiLibre {
  ciudadInput: string = '';
  datosClima: any = null;
  cargando: boolean = false;

  constructor(
    private apiLibreService: ApiLibreService,
    private cdr: ChangeDetectorRef,
  ) {}

  buscarClima() {
    if (!this.ciudadInput.trim()) {
      alert('Por favor, ingresa el nombre de una ciudad.');
      return;
    }

    this.cargando = true;
    this.datosClima = null;
    this.cdr.detectChanges();

    this.apiLibreService.obtenerClima(this.ciudadInput).subscribe({
      next: (data: any) => {
        const infoActual = data.current_condition[0];

        // Armamos un objeto limpio con lo que nos interesa mostrar
        this.datosClima = {
          nombre: this.ciudadInput,
          temperatura: infoActual.temp_C,
          descripcion: infoActual.lang_es
            ? infoActual.lang_es[0].value
            : infoActual.weatherDesc[0].value,
          humedad: infoActual.humidity,
          vientoVelocidad: infoActual.windspeedKmph,
          vientoDireccion: infoActual.winddir16Point, // Esto te da el Punto Cardinal (Ej: NW, E, SSE)
        };
        this.cargando = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al traer el clima:', err);
        this.cargando = false;

        this.cdr.detectChanges();
        alert('No se pudo encontrar la ciudad o el servidor no respondió.');
      },
    });
  }
}
