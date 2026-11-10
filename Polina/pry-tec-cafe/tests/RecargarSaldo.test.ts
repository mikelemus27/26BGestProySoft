//clase de pueba del caso de uso RecargarSaldo
import { RecargarSaldoUseCase } from "../src/core/use-cases/RecargarSaldo.js";
import { MockMonederoRepository } from "../src/infraestructure/repositorys/MockMonederoRepository.js";
import { Monedero, MonederoProps } from "../src/core/entities/Monedero.js";
import { eAlumno } from "../src/core/entities/eAlumno.js";

describe("RecargarSaldoUseCase", () => {
    let mockRepo: MockMonederoRepository;
    let useCase: RecargarSaldoUseCase;
    let unAlumno: eAlumno;
    beforeEach(() => {  //peparar la prueba antes de cada test
        mockRepo = new MockMonederoRepository();//usa base de datos mock
        useCase = new RecargarSaldoUseCase(mockRepo);
        unAlumno= new eAlumno({idAlumno:"312637", nombre:"juan"});

        // Crear un monedero de prueba y guardarlo en el repositorio simulado
        const monederoProps: MonederoProps = {
            idAlumno: unAlumno.getIdAlumno(), // ID del alumno
            saldo: 100
        };
        const monedero = new Monedero(monederoProps);
        mockRepo.guardar(monedero);
        //aqui ya tenemos 1 monedero guardao en la bd mock
    });

    it("debería recargar el saldo correctamente", async () => {
        const nuevoSaldo = await useCase.ejecutar(unAlumno.getIdAlumno(), 200);
        expect(nuevoSaldo).toBe(300); // 100 inicial + 200 recarga
    });

    it("debería lanzar un error si el monto de recarga es inválido", async () => {
        await expect(useCase.ejecutar(unAlumno.getIdAlumno(), 30)).rejects.toThrow(
            "Monto de recarga inválido para las reglas del Tec-Café"
        );
        await expect(useCase.ejecutar(unAlumno.getIdAlumno(), 600)).rejects.toThrow(
         "Monto de recarga inválido para las reglas del Tec-Café"
        );
    });

    it("debería lanzar un error si el monedero no existe", async () => {
        await expect(useCase.ejecutar("alumnoInexistente", 100)).rejects.toThrow(
            "Monedero no encontrado para el ID: alumnoInexistente"
        );
    });
});