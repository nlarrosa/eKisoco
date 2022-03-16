import { createContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';                               
import { AxiosError } from "axios";


import Sgdi from "../api/Sgdi";
import { TipoProductosData, FamiliasProductoData, ProductoData, AutorProductData, ProductSearchData } from '../interfaces/reposicionesInterface';
import { productReducer, ProductState } from '../reducers/productReducer';
import constantsGl from '../constants/globals';



type ProductContextProps = {

    messageProduct: string,
    isLoading: boolean,
    quantityReposity: Number,
    getProductTipo:    () => Promise<TipoProductosData[] | undefined>,
    getSearchByText:   (texto: string) => Promise<ProductSearchData | undefined> ,
    getFamiliaByTipo:  (tipo: string) => Promise<FamiliasProductoData[] | undefined>,
    getAutorByFamilia: (idProductoLogistica: string) => Promise<AutorProductData[] | undefined>,
    getTitulosByAutor:  (idProductoLogistica: string, autor: string) => Promise<ProductoData[] | undefined>,
    removeError: () => void,
}


const  ProductInitialState: ProductState = {

    messageProduct: '',
    quantityReposity: '',
}


export const ProductContext = createContext( {} as ProductContextProps );


export const ProductProvider = ({ children }: any ) => {

    

    const [ state, dispatch ] =  useReducer(productReducer, ProductInitialState)
    const [isLoading, setIsLoading] = useState(false);
    const [quantityReposity, setQuantityReposity] = useState<Number>(0)


    useEffect(() => {
      validateEnabledReposity();
    }, [])
    

    /** Validamos si el usuario esta habilitado
     * para generar reposiciones
     */
    const validateEnabledReposity = async() => {

        const userData  =  await AsyncStorage.getItem('userData');
        const { token, enabledReposity } = JSON.parse(userData || '{}');

        if(!enabledReposity)
        return dispatch({ 
            type: 'addMessageProduct', 
            payload: 'Usuario deshabilitado para carga de reposiciones, comuníquese con su distribuidor'
        })
        

        const quantity = await Sgdi.get('/Reposiciones/ObtenerCantidadDisponibleParaReposiciones', {
            params: {
                token,
            }
        });

        setQuantityReposity(quantity.data);
    }

    

    /** Busqueda de producto por texto la misma 
     * filtra por varioscampos de la tabla
     */
    const getSearchByText = async (texto: string) => {
         
        try {
            
            setIsLoading(true);
            const userData  = await AsyncStorage.getItem('userData');
            const { token } = JSON.parse(userData || '{}');


            const searchProduct = await Sgdi.get<ProductSearchData>('/Productos/BusquedaGeneral', {
                params: {
                    token,
                    texto,
                    hojaActual: 0
                }
            });

            setIsLoading(false);
            return searchProduct.data;

        } catch (error) {
            
        }
    }



    /** Obtengo los tipos de productos  */
    const getProductTipo = async () => {

        try {
            setIsLoading(true);
            const userData  = await AsyncStorage.getItem('userData');
            const { token } = JSON.parse(userData || '{}');
            
            const tipos =  await Sgdi.get<TipoProductosData[]>('/Productos/ObtenerTipos', {
                params: {
                    token, 
                }
            });

            setIsLoading(false);
            return tipos.data;

        } catch (error) {

            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProduct',
                payload:  err.response?.data

            });
            
        }
    }



    /** Obtengo la familia de productos segun el 
     * tipo seleccionado en tipo de productos
     */
    const getFamiliaByTipo = async (tipo: string) => {
            
        try {

            if(Boolean(tipo))
            {
                setIsLoading(true);
                const userData  = await AsyncStorage.getItem('userData');
                const { token } = JSON.parse(userData || '{}');

                const familia = await Sgdi.get<FamiliasProductoData[]>('/Productos/ObtenerFamiliasProducto', {
                    params: {
                        token,
                        idTipoProducto: tipo,
                    }
                });

                if(familia.data.length === 0)
                {
                    dispatch({
                        type: 'addMessageProduct',
                        payload: constantsGl.productNoData,
                    });
                }

                setIsLoading(false);
                return familia.data;
            }

        } catch (error) {
            
            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProduct',
                payload:  err.response?.data

            });
        }
    }



    /** Obtenemos el autor filtrando por familia que es
     * el IdProductoLogistica
     */
    const getAutorByFamilia = async ( idProductoLogistica: string) => {
            
        try {
            
            if(Boolean(idProductoLogistica)){

                setIsLoading(true);
                const userData  = await AsyncStorage.getItem('userData');
                const { token } = JSON.parse(userData || '{}');

                const autor = await Sgdi.get<AutorProductData[]>('/Productos/ObtenerProductosLogistica', {
                    params: {
                        token,
                        idProductoLogistica,
                    }
                });


                if(autor.data.length === 0)
                {
                    dispatch({
                        type: 'addMessageProduct',
                        payload: constantsGl.productNoData,
                    });
                }

                setIsLoading(false);
                return autor.data;
            }

        } catch (error) {
            
            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProduct',
                payload:  err.response?.data

            });
        }
    }



    /** Obtenemos los datos del producto de los cuales
     * utilizamos la descripcion para generar el titulo
     */
    const getTitulosByAutor = async (idProductoLogistica: string, autor: string) => {
            
        try {
            
            if(Boolean(idProductoLogistica) && Boolean(autor)){

                setIsLoading(true);
                const userData  = await AsyncStorage.getItem('userData');
                const { token } = JSON.parse(userData || '{}');

                const products = await Sgdi.get<ProductoData[]>('/Productos/ObtenerTituloEdiciones', {
                    params: {
                        token,
                        idProductoLogistica,
                        autor,
                    }
                });
                
                if(products.data.length === 0)
                {
                    dispatch({
                        type: 'addMessageProduct',
                        payload: constantsGl.productNoData,
                    });
                }

                setIsLoading(false);
                return products.data;
            }

        } catch (error) {
            
            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProduct',
                payload:  err.response?.data

            });
        }
    }



    /** Remuevo el error para que vuelva a funcionar
     * la alerta del buscador de productos
     */
     const removeError = () => {

        dispatch({
            type: 'removeMessageProduct',
        });
    };



    return (
        
        <ProductContext.Provider value = {{

            ...state,
            isLoading,
            quantityReposity,
            getProductTipo,
            getFamiliaByTipo,
            getSearchByText,
            getAutorByFamilia,
            getTitulosByAutor,
            removeError
        }}>
        
        { children }

        </ProductContext.Provider>
    )
}