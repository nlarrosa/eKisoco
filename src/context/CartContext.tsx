import { createContext, useReducer, useState, useContext } from "react";
import { ProductoData, ProductSearchData } from '../interfaces/reposicionesInterface';
import { cartReducer, CartState } from '../reducers/cartReducer';
import { CartData } from "../interfaces/cartInterfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { ProductContext } from './ProductContext';


type CartContextProps = {

    titleMessage: string,
    messageCart: string,
    isLoading: boolean,
    productsCart: CartData[] | undefined,
    totalQuantity: number,
    totalPrice: number,
    addToCart: ( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => void,
    removeToCart: ( idProducto: string ) => void,
    addQuantityProduct: ( idProducto: string, quantity:number ) => void,
    sumCart: ( price:number, quantity: number ) => void,
    removeMessageCart: () => void,
}

const CartInitialState: CartState = {

    titleMessage: '',
    messageCart: '',
    productsCart: undefined,
    totalQuantity: 0,
    totalPrice: 0,
}



export const CartContext = createContext({} as CartContextProps);


export const CartProvider = ({ children }: any ) => {

    const { getQuantityProduct } = useContext(ProductContext);
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

        if(validProduct.length > 0){

            return dispatch({
                type: 'errorCart',
                payload:  {
                    messageCart: 'El artículo ya se encuentra agregado al carrito',
                    titleMessage: 'Atención!',
                }
            });
        }


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
                 messageCart: 'Artículo agregado al carrito',
                 titleMessage: 'Exito!',
             }
         });

         /** Limpio a cero el contador de cantidades */
         getQuantityProduct(1);
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



    /** Maneja el agregado de cantidades desde el producto
     * o desde el carrito, esta ligado al Hook UseQuantity
     * donde se ejecuta este metodo
     */
    const addQuantityProduct = async (idProducto: string, quantity:number) => 
    {
        let cantidad: number = 0;
        let total: number = 0;

        if(productsCart.length > 0){

            productsCart.map((item) => {
                
                if(Number(item.id) === Number(idProducto)){
                    
                    item.Cantidad = quantity;
                    item.PrecioSum = quantity * Number(item.Precio);
                }

                cantidad = cantidad + item.Cantidad;
                total = total + item.PrecioSum;
            });

            setTotalQuantity(cantidad);
            setTotalPrice(total);
        }
        
        getQuantityProduct(quantity);

        setProductsCart([
            ...productsCart,
        ]);

    }




    const sumCart = async (price: number, quantity: number) => 
    {
        
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
            addToCart,
            removeToCart,
            productsCart,
            addQuantityProduct,
            sumCart,
            removeMessageCart,
        }}>

        { children}

        </CartContext.Provider>
    )
}

