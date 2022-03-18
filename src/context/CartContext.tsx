import { createContext, useReducer, useState, useContext } from "react";
import { ProductoData, ProductSearchData } from '../interfaces/reposicionesInterface';
import { cartReducer, CartState } from '../reducers/cartReducer';
import { CartData } from "../interfaces/cartInterfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';


type CartcontextProps = {

    messageCart: string,
    isLoading: boolean,
    productsCart: CartData[] | undefined,
    addToCart: ( selectedProduct: CartData, quantity: string ) => void,
    removeToCart: () => void,
    addQuantityProduct: () => void,
    sumCart: () => void,
}

const CartInitialState: CartState = {

    messageCart: '',
    productsCart: undefined,
}



export const CartContext = createContext({} as CartcontextProps);


export const CartProvider = ({ children }: any ) => {

    const [ state, dispatch ] = useReducer(cartReducer, CartInitialState)
    const [isLoading, setIsLoading] = useState(false);
    const [productsCart, setProductsCart] = useState<CartData[]>([]);


    const addToCart = async( selectedProduct: CartData, quantity: string ) => 
    {
        const userData = await AsyncStorage.getItem('userData');
        const { userId } = JSON.parse(userData || '{}');

        let cart = {
            Autor: selectedProduct.Autor,
            Descripcion: selectedProduct.Descripcion,
            Edicion: selectedProduct.Edicion,
            idProductoLogistica: selectedProduct.idProductoLogistica,
            Precio: selectedProduct.Precio,
            IdCanilla:userId,
            Cantidad: quantity,
        };

        setProductsCart([
            ...productsCart,
            cart
        ])


         dispatch({
             type: 'addToCart',
             payload: {
                 productsCart: productsCart,
             }
         });
    }


    const removeToCart = async () => 
    {

    }


    const sumCart = async () => 
    {

    }


    const addQuantityProduct = async () => 
    {

    }




    return(
        <CartContext.Provider value={{
            ...state,
            isLoading,
            addToCart,
            removeToCart,
            productsCart,
            addQuantityProduct,
            sumCart,
        }}>

        { children}

        </CartContext.Provider>
    )
}

