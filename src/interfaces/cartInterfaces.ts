export interface CartData {
    id: string,
    Autor: string,
    Descripcion: string,
    Edicion: string,
    idProductoLogistica: string,
    Precio: string,
    PrecioSum: number,
    IdCanilla?: string,
    Cantidad: number
}



export interface OrdersData {
    CantidadReposiciones: number;
    HojaActual:           number;
    reposiciones:         Reposiciones[];
}

export interface Reposiciones {
    IdCanilla:          string;
    FechaCreacion:      string;
    PrecioTotal:        number;
    PrecioUnidad:       number;
    IdReposicion:       number;
    Estado:             string;
    Titulo:             string;
    CantidadSolicitada: number;
    CantidadAsignada:   number;
    Familia:            string;
    Edicion:            number;
    Autor:              string;
}
