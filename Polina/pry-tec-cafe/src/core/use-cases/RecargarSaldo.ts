
import { IMonederoRepository } from "../../infraestructure/repositorys/IMonederoRepository.js"


export class RecargarSaldoUseCase {
    // Recibimos el repositorio (la conexión a DB) como una interfaz
    constructor(private repository: IMonederoRepository) {}

    async ejecutar(idAlumno: string, monto: number): Promise<number> {
        // 1. Buscar los datos (vía infraestructura, pero no sabemos cuál)
        const monedero = await this.repository.buscarPorId(idAlumno);

        // 2. Usar la Lógica de la Entidad (Cerebro)
        monedero.sumarSaldo(monto);

        // 3. Persistir los cambios
        await this.repository.guardar(monedero);

        return monedero.saldoActual;
    }
}
