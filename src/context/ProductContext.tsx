import { createContext, useReducer, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';                               
import { AxiosError } from "axios";


import Sgdi from "../api/Sgdi";
import { TipoProductosData, FamiliasProductoData, ProductoData, AutorProductData } from '../interfaces/reposicionesInterface';
import { productReducer, ProductState } from '../reducers/productReducer';



type ProductContextProps = {

    isLoading: boolean,
    // getSearchByText:   () => Promise<T>,
    getProductTipo:    () => Promise<TipoProductosData | undefined>,
    getFamiliaByTipo:  (tipo: string) => Promise<FamiliasProductoData | undefined>,
    getAutorByFamilia: (idProductoLogistica: string) => Promise<AutorProductData | undefined>,
    getTitulosByAutor:  (idProductoLogistica: string, autor: string) => Promise<ProductoData | undefined>,
}


const  ProductInitialState: ProductState = {

    messageProduct: '',
}


export const ProductContext = createContext( {} as ProductContextProps );


export const ProductProvider = ({ children }: any ) => {


    const [ dispatch, state ] =  useReducer(productReducer, ProductInitialState)
    const [isLoading, setIsLoading] = useState(false);

    

    const getSearchByText = async () => {
            
    }


    /** Obtengo los tipos de productos  */
    const getProductTipo = async () => {

        try {
            setIsLoading(true);
            const userData  = await AsyncStorage.getItem('userData');
            const { token } = JSON.parse(userData || '{}');
            
            const tipos =  await Sgdi.get<TipoProductosData>('/Productos/ObtenerTipos', {
                params: {
                    token, 
                }
            });

            setIsLoading(false);
            return tipos.data;

        } catch (error) {

            const err = error as AxiosError;
            
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

                const familia = await Sgdi.get<FamiliasProductoData>('/Productos/ObtenerFamiliasProducto', {
                    params: {
                        token,
                        idTipoProducto: tipo,
                    }
                });

                setIsLoading(false);
                return familia.data;
            }
        } catch (error) {
            
            // const err = error as AxiosError;
            // dispatch({
            //     type: 'addMessageProduct',
            //     payload: {
            //         messageProduct: err.response?.data;
            //     }
            // })
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

                const autor = await Sgdi.get<AutorProductData>('/Productos/ObtenerProductosLogistica', {
                    params: {
                        token,
                        idProductoLogistica,
                    }
                });

                console.log(autor);
                setIsLoading(false);
                return autor.data;
            }

        } catch (error) {
            
        }
    }


    const getTitulosByAutor = async (idProductoLogistica: string, autor: string) => {
            
        try {
            
            if(Boolean(idProductoLogistica) && Boolean(autor)){

                setIsLoading(true);
                const userData  = await AsyncStorage.getItem('userData');
                const { token } = JSON.parse(userData || '{}');

                const products = await Sgdi.get<ProductoData>('/Productos/ObtenerTituloEdiciones', {
                    params: {
                        token,
                        idProductoLogistica,
                        autor,
                    }
                });

                setIsLoading(false);
                return products.data;
            }

        } catch (error) {
            
        }
    }


    return (
        
        <ProductContext.Provider value = {{

            ...state,
            isLoading,
            getProductTipo,
            getFamiliaByTipo,
            // getSearchByText,
            getAutorByFamilia,
            getTitulosByAutor,
        }}>
        
        { children }

        </ProductContext.Provider>
    )
}