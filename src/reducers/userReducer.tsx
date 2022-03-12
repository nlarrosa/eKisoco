import { CuentasMadresData, CuentasHijasData, ProfileModify } from '../interfaces/userInterfaces';
import { CanillaResponse } from '../interfaces/loginInterfaces';


export interface UserState {

    isLoading: boolean,
    messageProfile: string,
    userProfile: CanillaResponse | null,
    cuentasMadresData: CuentasMadresData | null,
    cuentasHijasData: CuentasHijasData | null,
}


type UserAction = 

    |{ type: 'addMessageProfile', payload: string }
    |{ type: 'removeErrorProfile' }
    |{ type: 'cuentasMadres', payload: { cuentasMadresData: CuentasMadresData }}
    |{ type: 'cuentasHijas', payload: { cuentasHijasData: CuentasHijasData }}


export const userReducer = ( state: UserState, action: UserAction): UserState  => {

    switch (action.type) {

        case 'addMessageProfile':
            return {
                ...state,
                messageProfile: action.payload,
                cuentasMadresData: null,
                cuentasHijasData: null,
            }
        break;

        case 'removeErrorProfile':
            return {
                ...state,
                messageProfile: '',
                cuentasMadresData: null,
                cuentasHijasData: null,
            }
        break;

        case 'cuentasMadres':
            return {
                ...state,
                cuentasMadresData: action.payload.cuentasMadresData,
                messageProfile: '',
            }
        break;

        case 'cuentasHijas':
            return {
                ...state,
                cuentasHijasData: action.payload.cuentasHijasData,
                messageProfile: '',
            }
        break;
    
        default:
            break;
    }


}