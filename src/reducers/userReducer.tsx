import { ProfileData, CuentasMadresData, CuentasHijasData } from '../interfaces/userInterfaces';


export interface UserState {

    messageProfile: string | null,
    userData: ProfileData | null,
    cuentasMadresData: CuentasMadresData | null,
    cuentasHijasData: CuentasHijasData | null,
}


type UserAction = 
    |{ type: 'editProfile', payload: { userData: ProfileData } }
    |{ type: 'addErrorProfile', payload: string }
    |{ type: 'removeErrorProfile' }
    |{ type: 'cuentasMadres', payload: { cuentasMadresData: CuentasMadresData }}
    |{ type: 'cuentasHijas', payload: { cuentasHijasData: CuentasHijasData }}


export const userReducer = ( state: UserState, action: UserAction): UserState  => {

    switch (action.type) {

        case 'editProfile':
            return {
                ...state,
                userData: null,
            }
        break;

        case 'addErrorProfile':
            return {
                ...state,
                messageProfile: action.payload,
            }
        break;

        case 'removeErrorProfile':
            return {
                ...state,
                messageProfile: '',
            }
        break;

        case 'cuentasMadres':
            return {
                ...state,
                cuentasMadresData: action.payload.cuentasMadresData
            }
        break;

        case 'cuentasHijas':
            return {
                ...state,
                cuentasHijasData: action.payload.cuentasHijasData,
            }
        break;
    
        default:
            break;
    }


}