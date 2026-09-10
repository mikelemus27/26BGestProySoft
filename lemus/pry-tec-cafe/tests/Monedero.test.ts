

import { Monedero } from "../src/core/entities/Monedero.js";
//objeto  necesario para llamar a las  funciones  que se van a probar
const Objmonedero = new Monedero(  //constructor de la clase monedero
        { idAlumno: "124345", saldo: 500 }
    );

describe('Pruebas de Nómina Tec-Café', () => {
    
    //prueba1------------------------------------------------
    test('recarga  debe ser entre 50 y 500',
        () => { expect(
                       Objmonedero.validarMontoRecarga(50)
                      ).toBe(true); });
//prueba2 ---------------------------------------------------
   test('Recarga  mayor a 500 iimposible', 
        () => { expect(
                       Objmonedero.validarMontoRecarga(600)
                      ).toBe(false); });
//prueba3---------------------------------------------------
   test('Recarga  menor  a 50 iimposible', 
        () => { expect(
                       Objmonedero.validarMontoRecarga(40)
                      ).toBe(false); });

});
