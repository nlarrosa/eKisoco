export interface ProductState {

    messageProduct: string,
    quantityReposity: string,
}


type ProductAction = 

|{ type: 'addMessageProduct',  payload: string }
|{ type: 'removeMessageProduct' }


export const productReducer = ( state: ProductState, action: ProductAction) : ProductState => {
    

    switch (action.type) {

        case "addMessageProduct":
            return {
                ...state,
                messageProduct: action.payload,
            }
        break;

        case "removeMessageProduct":
            return {
                ...state,
                messageProduct: '',
            }
        break;
    
        default:
            return {
                ...state,
            }
        break;
    }

}