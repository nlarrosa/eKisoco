import { createContext, useReducer, useState, useContext, useRef } from "react";

import { cartReducer, CartState } from '../reducers/cartReducer';
import { CartData, OrdersData, Reposiciones } from '../interfaces/cartInterfaces';
import { ProductContext } from './ProductContext';
import { AuthContext } from './AuthContext';
import Sgdi from "../api/Sgdi";
import { AxiosError } from 'axios';
import constGlobals from '../constants/globals';


type CartContextProps = {

    titleMessage: string,
    messageCart: string,
    isLoading: boolean,
    productsCart: { [key:string]: CartData } | {},
    quantity: number,
    totalQuantity: number,
    totalPrice: number,
    orders: Reposiciones[],
    loadOrders: boolean,
    notificationOrders: number,
    addToCart: ( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => void,
    removeToCart: ( idProducto: string ) => void,
    addQuantityProduct: ( idProducto: string, quantity:number, actionCart:boolean ) => void,
    generateOrder: (products: { [key:string]: CartData } ) => void,
    getOrderByUser: (hojaActual: number) => void,
    getQuantityNotificationsOrders: () => void,
    removeNotificationOrders: () => void,
    removeMessageCart: () => void,
}

const CartInitialState: CartState = {

    titleMessage: '',
    messageCart: '',
    productsCart: {},
    quantity: 0,
    totalQuantity: 0,
    totalPrice: 0,
    notificationOrders: 0,
}



export const CartContext = createContext({} as CartContextProps);


export const CartProvider = ({ children }: any ) => {

    const { userId, token } = useContext(AuthContext);
    const { getQuantityProduct } = useContext(ProductContext);
    const [ state, dispatch ] = useReducer(cartReducer, CartInitialState)
    const [isLoading, setIsLoading] = useState(false);
    const [productsCart, setProductsCart] = useState<{[key:string]:CartData}>({});
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [orders, setOrders] = useState<Reposiciones[]>([]);
    const [loadOrders, setLoadOrders] = useState(true);


    const addToCart = async( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => 
    {
        try {
            
            if(Boolean(productsCart[selectedProduct.Edicion])){
    
                return dispatch({
                    type: 'errorCart',
                    payload:  {
                        messageCart: constGlobals.cartProductExistMsg,
                        titleMessage: constGlobals.titleAttention,
                    }
                });
            }
    
            const precioSum = Number(selectedProduct.Precio) * quantity;
    
            setTotalQuantity( totalQuantity + quantity );
            setTotalPrice( totalPrice + precioSum);
    
            setProductsCart( oldProductCart => {
                return {
                    ...oldProductCart,
                    [selectedProduct.Edicion]: { 
                        ...selectedProduct,  
                        idProductoLogistica,
                        PrecioSum: precioSum,
                        IdCanilla: userId || undefined,
                        Cantidad: quantity,
                    },
                }
            });
    
            setQuantity(1);
            
             dispatch({
                 type: 'addToCart',
                 payload: {
                     productsCart: productsCart,
                     messageCart: constGlobals.productAddCartMsg,
                     titleMessage: constGlobals.titleExit,
                 }
             });

        } catch (error) {
            
            const err = error as AxiosError;
            return dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: constGlobals.titleAttention,
                    messageCart: err.response?.data
                }
            })
        }
    }



    /** Elimino el producto del articulo y genero las
     * nuevas cantidades e importes totales
     */
    const removeToCart = ( idProducto: string ) => 
    {
        try {
            
            setIsLoading(true);
    
            setTotalQuantity( totalQuantity - Number(productsCart[idProducto].Cantidad) );
            setTotalPrice( totalPrice - (Number(productsCart[idProducto].Precio) * Number(productsCart[idProducto].Cantidad)));
            delete productsCart[idProducto];
    
            setProductsCart({
                ...productsCart
            });
    
            setIsLoading(false);

        } catch (error) {
            const err = error as AxiosError;
            dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: constGlobals.titleAttention,
                    messageCart: err.response?.data
                }
            })
        }
    }



    /** Maneja el agregado de cantidades desde el producto
     * o desde el carrito, esta ligado al Hook UseQuantity
     * donde se ejecuta este metodo
     */
    const addQuantityProduct = async (idProducto: string, quantity:number, actionCart:boolean) => 
    {
        let cantidad: number = 0;
        let total: number = 0;

        if(actionCart) {

            Object.entries(productsCart).map(([ key, product]) => {
                
                if(Number(product.Edicion) === Number(idProducto)){
                    
                    product.Cantidad = quantity;
                    product.PrecioSum = quantity * Number(product.Precio);
                }
    
                cantidad = cantidad + product.Cantidad;
                total = total + product.PrecioSum;
            });
    
            setTotalQuantity(cantidad);
            setTotalPrice(total);
            setQuantity(1);
        } else {

            setQuantity(quantity);
        }


        setProductsCart({
            ...productsCart
        });

    }



    const generateOrder = async (products: {[key: string]: CartData} ) => {

        try {
            
            const order = Object.entries(products).map(( [ key, product] ) => {
    
                return {
                    Token: token,
                    Descripcion: product.Descripcion,
                    Idcanilla: product.IdCanilla,
                    IdProductoLogistica: product.idProductoLogistica,
                    Edicion: product.Edicion,
                    Cantidad: product.Cantidad
                };
            })
    
            const SendOrder = await Sgdi.post('/Reposiciones', JSON.stringify(order));

            dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: constGlobals.titleAttention,
                    messageCart: constGlobals.cartProductMsg,
                }
            });

            getOrderByUser(0);
            setProductsCart({});
            setTotalPrice(0);
            setTotalQuantity(0);


        } catch (error) {

            const err = error as AxiosError;
            dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: constGlobals.titleError,
                    messageCart: err.response?.data || 'Error del sistema',
                }
            });
        }
    }


    /** obtenemos las ordenes de pedidos de reposiciones
     *  por usuario logueado 10 por carga
     */
    const getOrderByUser = async ( hojaActual: number) => {

        try {
            
            setIsLoading(true);
            
            const ordersRepo = await Sgdi.get<OrdersData>('/Reposiciones', {
                params: {
                    token,
                    IdCanilla: userId,
                    hojaActual
                }
            });


            const dataOrders: Reposiciones[] = ordersRepo.data.reposiciones.map( (order) => {
                
                if(order.Estado === 'Pendiente'){  order.EstadoColor = 'orange' };
                if(order.Estado === 'Sin Stock'){  order.EstadoColor = 'red' };
                if(order.Estado === 'Entregado'){  order.EstadoColor = 'green' };

                return {
                    IdCanilla:  order.IdCanilla,           
                    FechaCreacion: order.FechaCreacion,      
                    PrecioTotal: order.PrecioTotal,        
                    PrecioUnidad: order.PrecioUnidad,       
                    IdReposicion: order.IdReposicion,      
                    Estado: order.Estado,             
                    EstadoColor: order.EstadoColor,       
                    Titulo: order.Titulo,             
                    CantidadSolicitada: order.CantidadSolicitada,
                    CantidadAsignada: order.CantidadAsignada,
                    Familia: order.Familia,            
                    Edicion: order.Edicion,         
                    Autor: order.Autor,   
                    RepoNotificada: order.RepoNotificada,
                };           
            });

            if(dataOrders.length > 0){
                setOrders([ ...orders,  ...dataOrders ]);
            } else {
                setLoadOrders(false);
            }

            setIsLoading(false);

        } catch (error) {
            
            const err = error as AxiosError;
            dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: constGlobals.titleError,
                    messageCart: err.response?.data || 'Error del sistema',
                }
            });
        }
    }



    /** Obtengo las notificaciones de los cambios de estado 
     * de las ordenes del usuario
     */
    const getQuantityNotificationsOrders = async() => {

        try {

            const quantityOrders = await Sgdi.get<number>('/Reposiciones/ObtenerCantidadNotificacionesRepo', {
                params: {
                    token,
                    IdCanilla: userId,
                }
            });

            console.log(quantityOrders.data);

            dispatch({
                type:'notificationOrders',
                payload: {
                    notificationOrders: quantityOrders.data,
                }
            })
            
        } catch (error) {

            const err = error as AxiosError;
            dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: constGlobals.titleError,
                    messageCart: err.response?.data || 'Error del sistema',
                }
            });
        }
    }



    /** Limpia las notificaciones una vez que el usaurio
     * accede a la seccion de mis ordenes
     */
     const removeNotificationOrders = () => {
         dispatch({
             type:'notificationOrders',
             payload: {
                 notificationOrders: 0,
             }
         })
     }


    /** Remuevo el error para que vuelva a funcionar
     * la alerta del buscador de productos
     */
     const removeMessageCart = () => {

        dispatch({
            type: 'removeMessageCart',
        });
    };






    return(
        <CartContext.Provider value={{
            ...state,
            isLoading,
            totalPrice,
            totalQuantity,
            quantity,
            addToCart,
            removeToCart,
            productsCart,
            addQuantityProduct,
            removeMessageCart,
            generateOrder,
            getOrderByUser,
            orders,
            loadOrders,
            getQuantityNotificationsOrders,
            removeNotificationOrders,
        }}>

        { children}

        </CartContext.Provider>
    )
}

