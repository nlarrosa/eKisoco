import { createContext, useReducer, useState, useContext } from "react";
import { ProductoData, ProductSearchData } from '../interfaces/reposicionesInterface';
import { cartReducer, CartState } from '../reducers/cartReducer';
import { CartData } from "../interfaces/cartInterfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';


type CartcontextProps = {

    messageCart: string,
    isLoading: boolean,
    productsCart: CartData[] | undefined,
    totalQuantity: number,
    totalPrice: number,
    addToCart: ( selectedProduct: CartData, idProductoLogistica: string, quantity: string ) => void,
    removeToCart: ( idProducto: string ) => void,
    addQuantityProduct: () => void,
    sumCart: (price:number, quantity: number) => void,
}

const CartInitialState: CartState = {

    messageCart: '',
    productsCart: undefined,
    totalQuantity: 0,
    totalPrice: 0,
}



export const CartContext = createContext({} as CartcontextProps);


export const CartProvider = ({ children }: any ) => {

    const [ state, dispatch ] = useReducer(cartReducer, CartInitialState)
    const [isLoading, setIsLoading] = useState(false);
    const [productsCart, setProductsCart] = useState<CartData[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const addToCart = async( selectedProduct: CartData, idProductoLogistica: string, quantity: string ) => 
    {
        const userData = await AsyncStorage.getItem('userData');
        const { userId } = JSON.parse(userData || '{}');


        const precioSum = Number(selectedProduct.Precio) * Number(quantity);

        let cart = {
            id: selectedProduct.Edicion,
            Autor: selectedProduct.Autor,
            Descripcion: selectedProduct.Descripcion,
            Edicion: selectedProduct.Edicion,
            idProductoLogistica,
            Precio: selectedProduct.Precio,
            PrecioSum: precioSum,
            IdCanilla:userId,
            Cantidad: quantity,
        };

        setTotalQuantity( totalQuantity + Number(quantity) );
        setTotalPrice( totalPrice + precioSum);

        setProductsCart([
            ...productsCart,
            cart
        ]);


         dispatch({
             type: 'addToCart',
             payload: {
                 productsCart: productsCart,
             }
         });
    }



    
    const removeToCart = ( idProducto: string ) => 
    {

        let cartProducts = productsCart.filter((item) => item.id !== idProducto);
        let product = productsCart.filter((item) => item.id === idProducto); 
        
        setTotalQuantity( totalQuantity - Number(product[0].Cantidad) );
        setTotalPrice( totalPrice - (Number(product[0].Precio) * Number(product[0].Cantidad)));
        
        setProductsCart(
            cartProducts
        );
    }


    const sumCart = async (price: number, quantity: number) => 
    {
        
    }


    const addQuantityProduct = async () => 
    {

    }




    return(
        <CartContext.Provider value={{
            ...state,
            isLoading,
            totalPrice,
            totalQuantity,
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

