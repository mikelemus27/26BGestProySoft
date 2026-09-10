// Entidad: Reglas que NO cambian
export interface MonederoProps {
    idAlumno: string;
    saldo: number;
}

//clase  sin atributos
export class Monedero {

    
    //metodos
    constructor(private props: MonederoProps) {}

    // Regla de Negocio: No se puede recargar más de $500
    public validarMontoRecarga(monto: number): boolean {
        return monto >= 50 && monto <= 500;
    }

    public sumarSaldo(monto: number): void {
        if (!this.validarMontoRecarga(monto)) {
            throw new Error("Monto de recarga inválido para las reglas del Tec-Café");
        }
        this.props.saldo += monto;
    }

     get saldoActual():number {
        return this.props.saldo;
    }
    getIdAlumno(): string {
        return this.props.idAlumno;
    }
    
}
