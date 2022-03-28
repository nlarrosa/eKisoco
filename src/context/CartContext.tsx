import { createContext, useReducer, useState, useContext } from "react";
import { cartReducer, CartState } from '../reducers/cartReducer';
import { CartData } from "../interfaces/cartInterfaces";
import { ProductContext } from './ProductContext';
import { AuthContext } from './AuthContext';


type CartContextProps = {

    titleMessage: string,
    messageCart: string,
    isLoading: boolean,
    productsCart: CartData[] | undefined,
    quantity: number,
    totalQuantity: number,
    totalPrice: number,
    addToCart: ( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => void,
    removeToCart: ( idProducto: string ) => void,
    addQuantityProduct: ( idProducto: string, quantity:number, actionCart:boolean ) => void,
    generateOrder: (products: CartData[]) => void,
    removeMessageCart: () => void,
}

const CartInitialState: CartState = {

    titleMessage: '',
    messageCart: '',
    productsCart: undefined,
    quantity: 0,
    totalQuantity: 0,
    totalPrice: 0,
}



export const CartContext = createContext({} as CartContextProps);


export const CartProvider = ({ children }: any ) => {

    const { userId } = useContext(AuthContext);
    const { getQuantityProduct } = useContext(ProductContext);
    const [ state, dispatch ] = useReducer(cartReducer, CartInitialState)
    const [isLoading, setIsLoading] = useState(false);
    const [productsCart, setProductsCart] = useState<CartData[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);


    const addToCart = async( selectedProduct: CartData, idProductoLogistica: string, quantity: number ) => 
    {

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
            IdCanilla: userId || undefined,
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
         setQuantity(1);
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
    const addQuantityProduct = async (idProducto: string, quantity:number, actionCart:boolean) => 
    {
        let cantidad: number = 0;
        let total: number = 0;

        if(actionCart) {

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

        setQuantity(quantity)

        setProductsCart([
            ...productsCart,
        ]);

    }



    const generateOrder = (products: CartData[]) => {

        
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
        }}>

        { children}

        </CartContext.Provider>
    )
}

