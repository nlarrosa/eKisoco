export interface ProductState {

    titleMessage: string,
    messageProduct: string,
    quantityReposity: string,
}


type ProductAction = 

|{ type: 'addMessageProduct',  payload:{ messageProduct: string, titleMessage: string }}
|{ type: 'removeMessageProduct' }


export const productReducer = ( state: ProductState, action: ProductAction) : ProductState => {
    

    switch (action.type) {

        case "addMessageProduct":
            return {
                ...state,
                titleMessage: action.payload.titleMessage,
                messageProduct: action.payload.messageProduct,
            }
        break;

        case "removeMessageProduct":
            return {
                ...state,
                messageProduct: '',
                titleMessage: '',
            }
        break;
    
        default:
            return {
                ...state,
            }
        break;
    }

}