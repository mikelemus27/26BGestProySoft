
import { Monedero } from "../../core/entities/Monedero.js";
//contrato--todas las clase que lo implemente  deben tener esos  metodos
export interface IMonederoRepository {
    buscarPorId(id: string): Promise<Monedero>;
    guardar(monedero: Monedero): Promise<void>;
}
