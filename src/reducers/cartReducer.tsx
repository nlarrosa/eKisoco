import { ProductoData } from '../interfaces/reposicionesInterface';


export interface CartState {
    messageCart: string,
    quantity: string,
    productsCart: ProductoData[] | undefined,
};


type CartAction = 
    |{ type: 'addToCart', payload:{ quantity: string, productsCart: ProductoData, messageCart: string }}
    |{ type: 'removeProductToCart', payload:{ product: ProductoData }}
    |{ type: 'addQuantitytoProduct', payload:{ quantity: string }}
    |{ type: 'errorCart', payload:string }
 


export const cartReducer = (state: CartState, action: CartAction):  CartState => {

    switch (action.type) {
        case 'addToCart':
            return {
                ...state,
                quantity: '1',
                productsCart: action.payload.productsCart,
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
            }
        break;


        default:
            return {
                ...state,
            }
        break;
    }


}