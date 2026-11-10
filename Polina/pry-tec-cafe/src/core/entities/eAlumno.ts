// Entidad: Reglas que NO cambian
 interface eAlumnoProps {
    idAlumno: string;
    nombre: string;
}

//clase  sin atributos
export class eAlumno {
   
    
     //metodos
        constructor(private props: eAlumnoProps) {}

  public getNombre(): string {
         let nombre: string;
         nombre= this.props.nombre;
         return nombre;
    }    

    public setNombre(nombre: string): void {
        this.props.nombre = nombre;
    }
    public getIdAlumno(): string {
        return this.props.idAlumno;
    }
    public setIdAlumno(idAlumno: string): void {
        this.props.idAlumno = idAlumno;
    }


}
