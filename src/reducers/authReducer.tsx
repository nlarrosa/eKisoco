import { ProfileData } from '../interfaces/userInterfaces';

export interface AuthState {

    errorMessage: string,
    errorForgot: string,
    errorSignup: string,
    userId:      string | null,
    dataUser: ProfileData | null,
    token: string | null,
    enabledReposity: boolean,
    status: 'checking' | 'authenticated' | 'no-authenticated' | null,
}


type AuthAction = 
    |{ type: 'signIn', payload: { token: string, userId: string, dataUser: ProfileData, enabledReposity: boolean }}
    |{ type: 'signUp', payload: { token: string, userId: string, dataUser: ProfileData, enabledReposity: boolean }}
    |{ type: 'addError', payload: string }
    |{ type: 'addErrorForgot', payload: string }
    |{ type: 'addErrorSignup', payload: string }
    |{ type: 'removeError' }
    |{ type: 'NoAuthenticated' }
    |{ type: 'logout' }


    
export const authReducer = ( state: AuthState, action: AuthAction ):AuthState => {

    switch (action.type) {
        case 'signIn':
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                errorForgot: '',
                errorSignup: '',
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
                errorSignup: '',
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
                errorSignup: '',
                userId: null,
                dataUser: null,
                status: 'no-authenticated',
                token: null,
                enabledReposity: false,
            }
        break;

        case 'addErrorSignup':
            return {
                ...state,
                errorSignup: action.payload,
                errorMessage: '',
                errorForgot: '',
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
                errorSignup: '',
            }
        break;

        case 'NoAuthenticated':
        case 'logout':
            return {
                ...state,
                errorMessage: '',
                errorForgot: '',
                errorSignup: '',
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