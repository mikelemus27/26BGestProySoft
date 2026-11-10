
import { Monedero } from "../../core/entities/Monedero.js";
import { IMonederoRepository } from "./IMonederoRepository.js";


//laclase MockMonederoRepository   
// cumple con el contrato definido por la interfaz, pero en lugar 
// de interactuar con una base de datos real, utiliza un Map para 
// almacenar los monederos en memoria. Esto es útil para pruebas y 
// desarrollo sin necesidad de configurar una base de datos real.

export class MockMonederoRepository  implements IMonederoRepository {
       //usaremo un Map para simular una base de datos en memoria
    private monederos: Map<string, Monedero> = new Map();
//-----------------------------------------------------
      buscarPorId(id: string): Promise<Monedero>{
        // Simulamos una búsqueda en una base de datos
        const monedero =this.monederos.get(id);
         if (!monedero) {
            console.log(`No se encontró un monedero para el ID:${id}`); 
            throw new Error(`Monedero no encontrado para el ID: ${id}`);
        }
        return  monedero;
      }
      //------------------------------------
      guardar(monedero: Monedero): Promise<void>{
        // Simulamos guardar en una base de datos
          this.monederos.set(monedero.getIdAlumno(), monedero);
      }


}

