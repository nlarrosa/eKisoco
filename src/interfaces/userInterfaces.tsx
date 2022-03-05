

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
