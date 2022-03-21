import { CartData } from '../interfaces/cartInterfaces';
import { ProductoData } from '../interfaces/reposicionesInterface';


export interface CartState {
    messageCart: string,
    productsCart: CartData[] | undefined,
    totalQuantity: number,
    totalPrice: number,
};


type CartAction = 
    |{ type: 'addToCart', payload:{ productsCart: CartData[] }}
    |{ type: 'removeProductToCart', payload:{ product: ProductoData }}
    |{ type: 'addQuantitytoProduct', payload:{ quantity: string }}
    |{ type: 'errorCart', payload:string }
 


export const cartReducer = (state: CartState, action: CartAction):  CartState => {

    switch (action.type) {
        
        case 'addToCart':
            return {
                ...state,
                productsCart: action.payload.productsCart,
                messageCart: '',
            }   
        break;
        

        case 'removeProductToCart':
            return {
                ...state,
            }
        break;


        case 'addQuantitytoProduct':
            return {
                ...state,
            }
        break;


        case 'errorCart':
            return {
                ...state,
            }
        break;


        default:
            return {
                ...state,
            }
        break;
    }


}