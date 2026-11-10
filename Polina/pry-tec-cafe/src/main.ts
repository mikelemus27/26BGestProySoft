
import { Monedero } from "./core/entities/Monedero.js" //obligatoria la extension .js
console.log("--- Iniciando Sistema Tec-Café (CLI) ---");
function main() {
    const Objmonedero = new Monedero(
        { idAlumno: "124345", saldo: 500 }
    );
    console.log("Saldo inicial:", Objmonedero.saldoActual);
}
main();