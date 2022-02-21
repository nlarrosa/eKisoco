import { LoginResponse } from "../interfaces/loginInterfaces";

export interface AuthState {

    errorMessage: string,
    userId: string | null,
    token: string | null,
    enabledReposity: boolean,
    status: 'checking' | 'authenticated' | 'no-authenticated',
}


type AuthAction = 
    |{ type: 'signIn', payload: { token: string, userId: string, enabledReposity: boolean }}
    |{ type: 'signUp', payload: { token: string, userId: string, enabledReposity: boolean }}
    |{ type: 'addError', payload: string }
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
                status: 'authenticated',
                token: action.payload.token,
                userId: action.payload.userId,
                enabledReposity: action.payload.enabledReposity
            }
        break;

        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
                userId: null,
                status: 'no-authenticated',
                token: null,
                enabledReposity: false,
            }
        break;

        case 'removeError':
            return {
                ...state,
                errorMessage: '',
            }
        break;

        case 'NoAuthenticated':
        case 'logout':
            return {
                ...state,
                errorMessage: '',
                userId: null,
                status: 'no-authenticated',
                token: null,
                enabledReposity: false,
            }
        break;
    
        default:
            break;
    }
}