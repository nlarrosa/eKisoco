

export interface ProfileData {
    IdCanilla:             string;
    Token:                 string;
    Mail:                  string;
    Apellido:              string;
    Nombre:                string;
    Direccion:             string;
    CodPostal:             string;
    Localidad:             string;
    Celular:               string;
    IdMedioDeEntregaPadre: string;
    MedioDeEntregaPadre:   string;
    NroCuentaHija:         string;
    CuentaHija:            string;
    GrupoCuenta:           string;
    Paquete:               null;
    HabilitadoRepo:        boolean;
    Estado:                null;
    Motivo:                null;
    FechaCreacion:         string;
}


export interface ProfileModify {
    Clave:       string | undefined;
    Apellido:    string | undefined;
    Nombre:      string | undefined;
    Direccion:   string | undefined;
    CodPostal:   string | undefined;
    Localidad:   string | undefined;
    Celular:     string | undefined;
    Paquete:     string | undefined;
}


export interface CuentasMadresData {
    IdCuentaMadre: string;
    RazonSocial:   string;
};



export interface CuentasHijasData {
    IdCuentaHija: string;
    RazonSocial:  string;
}


export interface RegisterData {
    Email:       string | undefined;
    Clave:       string | undefined;
    ReClave:     string | undefined;
    Apellido:    string | undefined;
    Nombre:      string | undefined;
    Direccion:   string | undefined;
    CodPostal:   string | undefined;
    Localidad:   string | undefined;
    Celular:     string | undefined;
    Paquete:     string | undefined;
}



export interface AccountData {
    IdCanilla:                  string;
    DNI:                        string;
    CUIT:                       string;
    Provincia:                  string;
    EntrecallesPuesto:          string;
    Horarios:                   Horarios;
    ZonaRepartos:               { [key: string]: null };
    TieneReparto:               boolean;
    EntregaSuscripcionDiario:   boolean;
    EntregaSuscripcionRevistas: boolean;
    CargaDiario:                boolean;
    CargaRevista:               boolean;
    CargaOpcionales:            boolean;
}


export interface Horarios {
    Lunes:     null;
    Martes:    null;
    Miercoles: null;
    Jueves:    null;
    Viernes:   null;
    Sabado:    null;
    Domingo:   null;
}


export interface AccountModify {
    Dni:               string;
    Cuit:              string;
    Provincia:         string;
    Calles:            string;
    reparto:           boolean;
    entregaDiario:     boolean;
    entregaRevista:    boolean;
    cargaDiario:       boolean;
    cargaRevista:      boolean;
    cargaOpcionales:   boolean;
    calle1:            string;
    calle2:            string;
    calle3:            string;
    calle4:            string;
    calle5:            string;
    calle6:            string;
    calle7:            string;
    calle8:            string;
    calle9:            string;
    calle10:           string;
}



export interface HouersDays {
    houersDays: {
        [key: string]: { 
            desde:string, 
            hasta:string, 
            status:boolean, 
            color: string, 
            name:string
        }
    }
}
           