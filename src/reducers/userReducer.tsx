import { CuentasMadresData, CuentasHijasData, ProfileModify } from '../interfaces/userInterfaces';


export interface UserState {

    messageProfile: string,
    cuentasMadresData: CuentasMadresData | null,
    cuentasHijasData: CuentasHijasData | null,
    houersDays: {[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}},
}


type UserAction = 

    |{ type: 'addMessageProfile', payload: string }
    |{ type: 'removeErrorProfile' }
    |{ type: 'cuentasMadres', payload: { cuentasMadresData: CuentasMadresData }}
    |{ type: 'cuentasHijas', payload: { cuentasHijasData: CuentasHijasData }}
    |{ type: 'houersDaysData', payload:  {[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}} }


export const userReducer = ( state: UserState, action: UserAction):UserState  => {

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

        case 'houersDaysData':
            return {
                ...state,
                houersDays: action.payload,
            }

        break;
    
        default:
            return {
                ...state,
            }
        break;
    }


}