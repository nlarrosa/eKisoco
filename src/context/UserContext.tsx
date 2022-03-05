import { createContext, useReducer } from "react"
import { ProfileData, ProfileModify, CuentasMadresData, CuentasHijasData } from '../interfaces/userInterfaces';
import { userReducer, UserState } from '../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sgdi from "../api/Sgdi";
import { AxiosError } from 'axios';
import axios from 'axios';



type UserContextProps = {

    messageProfile: string | null,
    userData: ProfileData | null,
    cuentasMadresData: CuentasMadresData | null,
    cuentasHijasData: CuentasHijasData | null,
    getProfile:  () => void,
    editProfile: (ProfileModify : ProfileModify) => void,
    editAccount: () => void,
    removeErrorProfile: () => void,
    getCuentasMadres: (region: string) => void,
    getCuentasHijas:  (idCuentaMadre: string) => void,
}


const  userInitialState: UserState = {
    messageProfile: '',
    userData: null,
    cuentasMadresData: null,
    cuentasHijasData: null,
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
            
            const err = error as AxiosError;
            dispatch({
                type: 'addErrorProfile',
                payload: err.response?.data,
            });
        }
    };


    /** Obtenemos las cuentas hijas segun
     * la cuenta madre seleccionada
    */
    const getCuentasHijas = async(idCuentaMadre: string) => {
        
        try {

            const response = await Sgdi.get('/CuentasHijas', {
                params: {
                    grupoCuenta: 'YDI',
                    idCuentaMadre,
                }
            });

            dispatch({
                type: 'cuentasHijas',
                payload: {
                    cuentasHijasData: response.data,
                },
            })
            
        } catch (error) {
            const err = error as AxiosError;
            dispatch({
                type: 'addErrorProfile',
                payload: err.response?.data,
            });
        }
    };



    const editAccount =  () => {};


    /** Limpia los errores para poder reutilizarlos
     * y cerrar las alertas
     */
    const removeErrorProfile =  () => {
        dispatch({ 
            type: 'removeMessageProfile' 
        });
    };


    return(
        <UserContext.Provider value = {{
            ...state,
            getProfile,
            editProfile,
            editAccount,
            removeErrorProfile,
            getCuentasMadres,
            getCuentasHijas,
        }}>

            { children }

        </UserContext.Provider>
    );

}