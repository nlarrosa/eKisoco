import { createContext, useReducer, useState, useContext } from "react";
import { ProductoData, ProductSearchData } from '../interfaces/reposicionesInterface';
import { cartReducer, CartState } from '../reducers/cartReducer';
import { CartData } from "../interfaces/cartInterfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";


type CartContextProps = {

    messageCart: string,
    isLoading: boolean,
    productsCart: CartData[] | undefined,
    totalQuantity: number,
    totalPrice: number,
    addToCart: ( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => void,
    removeToCart: ( idProducto: string ) => void,
    addQuantityProduct: ( idProducto: string, quantity:number ) => void,
    sumCart: ( price:number, quantity: number ) => void,
    removeError: () => void,
}

const CartInitialState: CartState = {

    messageCart: '',
    productsCart: undefined,
    totalQuantity: 0,
    totalPrice: 0,
}



export const CartContext = createContext({} as CartContextProps);


export const CartProvider = ({ children }: any ) => {

    const [ state, dispatch ] = useReducer(cartReducer, CartInitialState)
    const [isLoading, setIsLoading] = useState(false);
    const [productsCart, setProductsCart] = useState<CartData[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const addToCart = async( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => 
    {
        const userData = await AsyncStorage.getItem('userData');
        const { userId } = JSON.parse(userData || '{}');


        /** Validamos si ya existe el producto
         * que se quiere agregar al carrito
         */
        const validProduct = productsCart.filter( (product) => product.id === selectedProduct.Edicion );
        if(validProduct.length > 0)
        return Alert.alert('PRODUCTO EXISTENTE', 'El producto seleccionado ya fue agregado al carrito');


        const precioSum = Number(selectedProduct.Precio) * quantity;

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

        setTotalQuantity( totalQuantity + quantity );
        setTotalPrice( totalPrice + precioSum);

        setProductsCart([
            ...productsCart,
            cart
        ]);


         dispatch({
             type: 'addToCart',
             payload: {
                 productsCart: productsCart,
                 messageCart: 'El producto se agrego al carrito',
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




    const addQuantityProduct = async (idProducto: string, quantity:number) => 
    {
        let product = productsCart.filter((item) => item.id === idProducto);
        setTotalQuantity( totalQuantity + Number(product[0].Cantidad) );
        setTotalPrice( totalPrice + (Number(product[0].Precio) * Number(product[0].Cantidad)));
    }




    const sumCart = async (price: number, quantity: number) => 
    {
        
    }




    /** Remuevo el error para que vuelva a funcionar
     * la alerta del buscador de productos
     */
     const removeError = () => {

        dispatch({
            type: 'removeError',
        });
    };






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
            removeError,
        }}>

        { children}

        </CartContext.Provider>
    )
}

