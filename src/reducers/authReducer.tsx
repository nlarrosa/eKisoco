import { LoginResponse, CanillaResponse } from '../interfaces/loginInterfaces';

export interface AuthState {

    errorMessage: string,
    errorForgot: string,
    userId:      string | null,
    dataUser: CanillaResponse | null,
    token: string | null,
    enabledReposity: boolean,
    status: 'checking' | 'authenticated' | 'no-authenticated' | null,
}


type AuthAction = 
    |{ type: 'signIn', payload: { token: string, userId: string, dataUser: CanillaResponse, enabledReposity: boolean }}
    |{ type: 'signUp', payload: { token: string, userId: string, dataUser: CanillaResponse, enabledReposity: boolean }}
    |{ type: 'addError', payload: string }
    |{ type: 'addErrorForgot', payload: string }
    |{ type: 'removeError' }
    |{ type: 'NoAuthenticated' }
    |{ type: 'logout' }


    
export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch (action.type) {
        case 'signIn':
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                errorForgot: '',
                status: 'authenticated',
                token: action.payload.token,
                userId: action.payload.userId,
                dataUser: action.payload.dataUser,
                enabledReposity: action.payload.enabledReposity
            }
        break;

        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
                errorForgot: '',
                userId: null,
                dataUser: null,
                status: 'no-authenticated',
                token: null,
                enabledReposity: false,
            }
        break;

        case 'addErrorForgot':
            return {
                ...state,
                errorForgot: action.payload,
                errorMessage: '',
                userId: null,
                dataUser: null,
                status: 'no-authenticated',
                token: null,
                enabledReposity: false,
            }
        break;

        case 'removeError':
            return {
                ...state,
                errorMessage: '',
                errorForgot: '',
            }
        break;

        case 'NoAuthenticated':
        case 'logout':
            return {
                ...state,
                errorMessage: '',
                errorForgot: '',
                userId: null,
                dataUser: null,
                status: 'no-authenticated',
                token: null,
                enabledReposity: false,
            }
        break;

    
        default:
            break;
    }
}