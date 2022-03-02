import { ProfileData, CuentasMadresData } from '../interfaces/userInterfaces';


export interface UserState {

    messageProfile: string | null,
    userData: ProfileData | null,
    cuentasMadresData: CuentasMadresData | null,
}


type UserAction = 
    |{ type: 'editProfile', payload: { userData: ProfileData } }
    |{ type: 'addMessageProfile', payload: string }
    |{ type: 'removeMessageProfile' }
    |{ type: 'cuentasMadres', payload: { cuentasMadresData: CuentasMadresData }}


export const userReducer = ( state: UserState, action: UserAction): UserState  => {

    switch (action.type) {

        case 'editProfile':
            return {
                ...state,
                userData: null,
            }
        break;

        case 'addMessageProfile':
            return {
                ...state,
                messageProfile: '',
            }
        break;

        case 'removeMessageProfile':
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
    
        default:
            break;
    }


}