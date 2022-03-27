import { CartData } from '../interfaces/cartInterfaces';
import { ProductoData } from '../interfaces/reposicionesInterface';


export interface CartState {
    titleMessage: string
    messageCart: string,
    productsCart: CartData[] | undefined,
    totalQuantity: number,
    totalPrice: number,
};


type CartAction = 
    |{ type: 'addToCart', payload:{ productsCart: CartData[], messageCart: string, titleMessage: string }}
    |{ type: 'removeProductToCart', payload:{ product: ProductoData }}
    |{ type: 'addQuantitytoProduct', payload:{ quantity: string }}
    |{ type: 'errorCart', payload:{ titleMessage:string, messageCart: string }}
    |{ type: 'removeMessageCart' }
 


export const cartReducer = (state: CartState, action: CartAction):  CartState => {

    switch (action.type) {
        
        case 'addToCart':
            return {
                ...state,
                productsCart: action.payload.productsCart,
                titleMessage: action.payload.titleMessage,
                messageCart: action.payload.messageCart,
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
                titleMessage: action.payload.titleMessage,
                messageCart: action.payload.messageCart,
            }
        break;

        case 'removeMessageCart':
            return {
                ...state,
                titleMessage: '',
                messageCart: '',
            }
        break;


        default:
            return {
                ...state,
            }
        break;
    }


}