import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Divisas } from '../../services/divisas';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './conversor.html',
  styleUrl: './conversor.css',
})
export class Conversor {
  cantidad: number = 1;
  monedaOrigen: string = 'USD';
  monedaDestino: string = 'ARS';

  resultado: number | null = null;
  cargando: boolean = false;
  errorMensaje: string = '';

  listaMonedas = [
    { codigo: 'USD', nombre: 'USD - Dólares EEUU' },
    { codigo: 'ARS', nombre: 'ARS - Pesos Argentinos' },
    { codigo: 'EUR', nombre: 'EUR - Euros' },
    { codigo: 'BRL', nombre: 'BRL - Reales Brasileños' },
    { codigo: 'CLP', nombre: 'CLP - Pesos Chilenos' },
  ];

  constructor(
    private divisasService: Divisas,
    private cdr: ChangeDetectorRef,
  ) {}

  ejecutarConversion(): void {
    if (this.cantidad <= 0) {
      this.errorMensaje = 'Por favor, ingrese una cantidad mayor a 0.';
      return;
    }

    this.cargando = true;
    this.resultado = null;
    this.errorMensaje = '';

    this.cdr.detectChanges();

    this.divisasService.convertir(this.monedaOrigen, this.monedaDestino).subscribe({
      next: (response: any) => {
        console.log(response);

        if (response && response.quotes) {
          const key = `${this.monedaOrigen}${this.monedaDestino}`;

          const tasa = response.quotes[key];

          if (tasa) {
            this.resultado = this.cantidad * tasa;
          } else {
            this.errorMensaje = 'No se encontró la tasa de conversión.';
          }
        } else {
          this.errorMensaje = 'La API no devolvió datos válidos.';
        }

        this.cargando = false;
        this.cdr.detectChanges();
      },

      error: (err: any) => {
        console.error('Error:', err);

        this.errorMensaje = 'Hubo un problema al conectar con la API.';

        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
