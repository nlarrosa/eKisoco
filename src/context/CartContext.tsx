import { createContext, useReducer, useState } from "react";
import { State } from "react-native-gesture-handler";
import { ProductoData } from "../interfaces/reposicionesInterface";
import { cartReducer, CartState } from '../reducers/cartReducer';
import { AddQuantityCart } from '../components/AddQuantityCart';
import { ProductCard } from '../components/ProductCard';
import { ActionSheetIOS } from "react-native";


type CartcontextProps = {

    messageCart: string,
    isLoading: boolean,
    quantity: string,
    productsCart: ProductoData[] | undefined,
    addToCart: ( selectedProduct: ProductoData, quantity: string ) => void,
    removeToCart: () => void,
    addQuantityProduct: () => void,
    sumCart: () => void,
}

const CartInitialState: CartState = {

    messageCart: '',
    quantity: '',
    productsCart: undefined,
}



export const CartContext = createContext({} as CartcontextProps);


export const CartProvider = ({ children }: any ) => {

    const [ state, dispatch ] = useReducer(cartReducer, CartInitialState)
    const [isLoading, setIsLoading] = useState(false);
    const [productsCart, setProductsCart] = useState();


    const addToCart = ( selectedProduct: ProductoData[], quantity: string ) => 
    {

    
         dispatch({
             type: 'addToCart',
             payload: {
                 quantity: '1',
                 productsCart: selectedProduct,
                 messageCart: ' Se agrego el producto al carrito',
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

