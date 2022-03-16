

export interface TipoProductosData {
    IdTipoProducto: number;
    Descripcion:    string;
}




export interface FamiliasProductoData {
    IdProductoLogistica: string;
    Descripcion:         string;
}



export interface AutorProductData {
    Autor: string,
}



export interface ProductoData {
    IdProductoLogistica: string;
    Familia:             string;
    Autor:               string;
    Edicion:             number;
    FechaCirculacion:    string;
    Descripcion:         string;
    Precio:              number;
    URLImagen:           string;
}




export interface ProductSearchData {
    CantidadBusqueda: number;
    HojaActual:       number;
    Titulos:          Titulo[];
}

export interface Titulo {
    IdProductoLogistica: string;
    Familia:             string;
    Autor:               string;
    Edicion:             number;
    FechaCirculacion:    string;
    Descripcion:         string;
    Precio:              number;
    URLImagen:           string;
}



