import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosService } from '../../services/autos'; // Ajustado al nombre real de tu archivo

@Component({
  selector: 'app-card-maker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-maker.html', // Ajustado a tu estructura
  styleUrl: './card-maker.css', // Ajustado a tu estructura
})
export class CardMakerComponent{
  listaMarcas: any[] = [];
  listaModelos: any[] = [];
  marcaSeleccionada: string = '';
  cargandoModelos: boolean = false;

  constructor(
    private autosService: AutosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.autosService.getMarcas().subscribe({
      next: (response: any) => {
        // En modo estricto, nos aseguramos de que termine siendo un arreglo valido
        this.listaMarcas = response.data || response || [];
        console.log('Marcas cargadas correctamente:', this.listaMarcas);

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        // CORREGIDO: Añadido : any para eliminar el error TS7006
        console.error('Error al solicitar las marcas:', err);
      },
    });
  }

  verModelos(idMarca: string, nombreMarca: string): void {
    this.marcaSeleccionada = nombreMarca;
    this.listaModelos = [];
    this.cargandoModelos = true;

    this.autosService.ModelosPorMarca(idMarca).subscribe({
      next: (response: any) => {
        this.listaModelos = response.data || response || [];
        this.cargandoModelos = false;
        console.log('Modelos cargados:', this.listaModelos);
        
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        // CORREGIDO: Añadido : any acá también
        console.error('Error al solicitar los modelos:', err);
        this.cargandoModelos = false;
      },
    });
  }
}
