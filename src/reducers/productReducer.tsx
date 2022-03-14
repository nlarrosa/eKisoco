export interface ProductState {

    messageProduct: string,
}


type ProductAction = 

|{ type: 'addMessageProduct',  payload: string }
|{ type: 'removeMessageProduct' }


export const productReducer = ( state: ProductState, action: ProductAction) : ProductState => {
    

    switch (action.type) {

        case "addMessageProduct":
            return {
                ...state,
                messageProduct: '',
            }
        break;

        case "removeMessageProduct":
            return {
                ...state,
                messageProduct: '',
            }
        break;
    
        default:
            break;
    }

}