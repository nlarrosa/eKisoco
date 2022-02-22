import { ProfileData } from '../interfaces/userInterfaces';


export interface UserState {

    messageProfile: string | null,
    userData: ProfileData | null,
}


type UserAction = 
    |{ type: 'editProfile', payload: { userData: ProfileData } }
    |{ type: 'addMessageProfile', payload: string }
    |{ type: 'removeMessageProfile' }


export const userReducer = ( state: UserState, action: UserAction): UserState => {

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
    
        default:
            break;
    }


}