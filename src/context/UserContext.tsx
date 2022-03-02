import { createContext, useReducer } from "react"
import { ProfileData, ProfileModify, CuentasMadresData } from '../interfaces/userInterfaces';
import { userReducer, UserState } from '../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sgdi from "../api/Sgdi";



type UserContextProps = {

    messageProfile: string | null,
    userData: ProfileData | null,
    cuentasMadresData: CuentasMadresData | null,
    getProfile:  () => void,
    editProfile: (ProfileModify : ProfileModify) => void,
    editAccount: () => void,
    removeMessaggeProfile: () => void,
    getCuentasMadres: (region: string) => void,
}


const  userInitialState: UserState = {
    messageProfile: '',
    userData: null,
    cuentasMadresData: null,
}


export const UserContext = createContext( {} as UserContextProps );

export const UserProvider = ( { children }: any ) => {

    const  [ state, dispatch ] = useReducer( userReducer, userInitialState);


    /** Obtengo los datos del usuario del storage
     * para ostrarlos en el perfil
     */
    const getProfile = async() => {

        const userData = await AsyncStorage.getItem('userData');
        const { dataUser} = JSON.parse(userData || '{}');
        console.log(dataUser);
    }



    /** Cambiamos los datos del usuario desde el 
     * perfil solo los permitidos
     */
    const editProfile =  async( profileData : ProfileModify ) => {

        console.log(profileData);
    }



    /** Obtenemos las cuentas madres segun
     * la region seleccionada
    */
    const getCuentasMadres = async( region: string ) => {

        try {
            
            const response = await Sgdi.get('/CuentasMadres', { 
                params: {
                    grupoCuenta: region,
                }
            });

    
            dispatch({
                type: 'cuentasMadres',
                payload: {
                    cuentasMadresData: response.data,
                }
            });

        } catch (error) {
            
            // console.log(error, 'error cuentas madres')
        }
    }



    const editAccount =  () => {};
    const removeMessaggeProfile =  () => {};


    return(
        <UserContext.Provider value = {{
            ...state,
            getProfile,
            editProfile,
            editAccount,
            removeMessaggeProfile,
            getCuentasMadres
        }}>

            { children }

        </UserContext.Provider>
    );

}