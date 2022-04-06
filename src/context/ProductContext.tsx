import { createContext, useContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';                               
import { AxiosError } from "axios";


import Sgdi from "../api/Sgdi";
import { TipoProductosData, FamiliasProductoData, ProductoData, AutorProductData, ProductSearchData } from '../interfaces/reposicionesInterface';
import { productReducer, ProductState } from '../reducers/productReducer';
import constantsGl from '../constants/globals';
import { AuthContext } from './AuthContext';




type ProductContextProps = {

    titleMessage: string,
    messageProduct: string,
    isLoading: boolean,
    quantityReposity: number,
    quantity: number,
    getUserQuantityReposity: () => void,
    getProductTipo:    () => Promise<TipoProductosData[] | undefined>,
    getSearchByText:   (texto: string) => Promise<ProductSearchData | undefined> ,
    getFamiliaByTipo:  (tipo: string) => Promise<FamiliasProductoData[] | undefined>,
    getAutorByFamilia: (idProductoLogistica: string) => Promise<AutorProductData[] | undefined>,
    getTitulosByAutor:  (idProductoLogistica: string, autor: string) => Promise<ProductoData[] | undefined>,
    getQuantityProduct: (quantity: number) => void,
    removeError: () => void,
}


const  ProductInitialState: ProductState = {

    titleMessage: '',
    messageProduct: '',
    quantityReposity: '',
}


export const ProductContext = createContext( {} as ProductContextProps );


export const ProductProvider = ({ children }: any ) => {

    

    const [ state, dispatch ] =  useReducer(productReducer, ProductInitialState);
    const { token, enabledReposity} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [quantityReposity, setQuantityReposity] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);



    /** Validamos si el usuario esta habilitado
     * para generar reposiciones
     */
    const getUserQuantityReposity = async() => {

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

            const searchProduct = await Sgdi.get<ProductSearchData>('/Productos/BusquedaGeneral', {
                params: {
                    token,
                    texto,
                    hojaActual: 0
                }
            });


            /** Validamos si se obtienen resultados en la 
             * busqueda si no mostramos alerta
             */
            if(searchProduct.data.Titulos.length === 0 )
            dispatch({
                type: 'addMessageProduct',
                payload:{
                    titleMessage: 'Atencion!',
                    messageProduct: constantsGl.productNoData,
                }
            })
            
            
            setIsLoading(false);
            return searchProduct.data;

        } catch (error) {

            
        }
    }



    /** Obtengo los tipos de productos  */
    const getProductTipo = async () => {

        try {
            setIsLoading(true);

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
                payload:{
                    titleMessage: 'Atencion!',
                    messageProduct: err.response?.data,
                }
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
                        payload:{
                            titleMessage: 'Atencion!',
                            messageProduct: constantsGl.productNoData,
                        }
                    });
                }

                setIsLoading(false);
                return familia.data;
            }

        } catch (error) {
            
            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProduct',
                payload:{
                    titleMessage: 'Atencion!',
                    messageProduct: err.response?.data,
                }

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
                        payload:{
                            titleMessage: 'Atencion!',
                            messageProduct: constantsGl.productNoData,
                        }
                    });
                }

                setIsLoading(false);
                return autor.data;
            }

        } catch (error) {
            
            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProduct',
                payload:{
                    titleMessage: 'Atencion!',
                    messageProduct: err.response?.data,
                }

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
                        payload:{
                            titleMessage: 'Atencion!',
                            messageProduct: constantsGl.productNoData,
                        }
                    });
                }

                setIsLoading(false);
                return products.data;
            }

        } catch (error) {
            
            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProduct',
                payload:{
                    titleMessage: 'Atencion!',
                    messageProduct: err.response?.data,
                }

            });
        }
    }



    
    const getQuantityProduct = (quantity: number) => {

        setQuantity(1);
        setQuantity(quantity);
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
            quantity,
            getProductTipo,
            getFamiliaByTipo,
            getSearchByText,
            getAutorByFamilia,
            getTitulosByAutor,
            getQuantityProduct,
            removeError,
            getUserQuantityReposity
        }}>
        
        { children }

        </ProductContext.Provider>
    )
}