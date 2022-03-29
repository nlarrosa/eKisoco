import { createContext, useReducer, useState, useContext } from "react";
import { cartReducer, CartState } from '../reducers/cartReducer';
import { CartData, OrdersData } from '../interfaces/cartInterfaces';
import { ProductContext } from './ProductContext';
import { AuthContext } from './AuthContext';
import Sgdi from "../api/Sgdi";
import { AxiosError } from 'axios';


type CartContextProps = {

    titleMessage: string,
    messageCart: string,
    isLoading: boolean,
    productsCart: { [key:string]: CartData } | {},
    quantity: number,
    totalQuantity: number,
    totalPrice: number,
    addToCart: ( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => void,
    removeToCart: ( idProducto: string ) => void,
    addQuantityProduct: ( idProducto: string, quantity:number, actionCart:boolean ) => void,
    generateOrder: (products: { [key:string]: CartData } ) => void,
    getOrderByUser: (idCanilla: string, hojaActual: number) => void;
    removeMessageCart: () => void,
}

const CartInitialState: CartState = {

    titleMessage: '',
    messageCart: '',
    productsCart: {},
    quantity: 0,
    totalQuantity: 0,
    totalPrice: 0,
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


    const addToCart = async( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => 
    {

        if(Boolean(productsCart[selectedProduct.Edicion])){

            return dispatch({
                type: 'errorCart',
                payload:  {
                    messageCart: 'El artículo ya se encuentra agregado al carrito',
                    titleMessage: 'Atención!',
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
                 messageCart: 'Artículo agregado al carrito',
                 titleMessage: 'Exito!',
             }
         });

         /** Limpio a cero el contador de cantidades */
    }



    /** Elimino el producto del articulo y genero las
     * nuevas cantidades e importes totales
     */
    const removeToCart = ( idProducto: string ) => 
    {

        setTotalQuantity( totalQuantity - Number(productsCart[idProducto].Cantidad) );
        setTotalPrice( totalPrice - (Number(productsCart[idProducto].Precio) * Number(productsCart[idProducto].Cantidad)));
        delete productsCart[idProducto];

        setProductsCart({
            ...productsCart
        });
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

            return dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: 'Atención!',
                    messageCart: 'Pedido generado correctamente',
                }
            });


        } catch (error) {

            const err = error as AxiosError;
            dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: 'Error!',
                    messageCart: err.response?.data || 'Error del sistema',
                }
            });
        }
        

    }



    const getOrderByUser = async ( idCanilla: string, hojaActual: number) => {

        try {
            
            const orders = await Sgdi.get('/Reposiciones', {
                params: {
                    token,
                    idCanilla,
                    hojaActual
                }
            });

            return orders;

            
        } catch (error) {
            
            const err = error as AxiosError;
            dispatch({
                type: 'errorCart',
                payload: {
                    titleMessage: 'Error!',
                    messageCart: err.response?.data || 'Error del sistema',
                }
            });
        }
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
        }}>

        { children}

        </CartContext.Provider>
    )
}

