import { createContext, useReducer, useState } from "react"
import { AxiosError } from 'axios';

import { ProfileModify, CuentasMadresData, CuentasHijasData, ProfileData } from '../interfaces/userInterfaces';
import { userReducer, UserState } from '../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sgdi from "../api/Sgdi";
import constantes from '../constants/globals';





type UserContextProps = {

    isLoading: boolean,
    profile: ProfileData | undefined,
    insigne: string,
    messageProfile: string,
    cuentasMadresData: CuentasMadresData | null,
    cuentasHijasData: CuentasHijasData | null,
    editProfile: (ProfileModify : ProfileModify, grupoCuenta:string) => void,
    removeErrorProfile: () => void,
    getCuentasMadres: (region: string) => void,
    getCuentasHijas:  (idCuentaMadre: string) => void,
    getProfile: (token:string, idCanilla:string) => Promise<ProfileData>,
}


const  userInitialState: UserState = {
    
    messageProfile: '',
    cuentasMadresData: null,
    cuentasHijasData: null,
}


export const UserContext = createContext( {} as UserContextProps );



export const UserProvider = ( { children }: any ) => {

    const [ state, dispatch ]   = useReducer( userReducer, userInitialState);
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<ProfileData>();   
    const [insigne, setInsigne] = useState(''); 


    /** Devuelve los datos del Canilla lofueado */
    const getProfile = async(token:string, idCanilla:string) => {

        setIsLoading(true);

        const response = await Sgdi.get<ProfileData>('/Canillas', { 
            params: { 
                token, 
                idCanilla
            }
        });

        getInsigneName();

        setIsLoading(false);
        return response.data;
    }


    /** Cambiamos los datos del usuario desde el 
     * perfil solo los permitidos
     */
    const editProfile =  async( profileData : ProfileModify, grupoCuenta: string ) => {

        const userData  = await AsyncStorage.getItem('userData');
        const { token, userId } = JSON.parse(userData || '{}');

        try {

            const validate:any = validateProfileForm(profileData, grupoCuenta);

            if(!validate.status){
                dispatch({ type: 'addMessageProfile', payload: validate.msg });
                return;
            }

            const resp = await Sgdi.put('/Canillas', null, {
                params: {
                    token,
                    IdCanilla: userId,
                    clave: profileData.Clave,
                    apellido: profileData.Apellido,
                    nombre: profileData.Nombre,
                    direccion: profileData.Direccion,
                    codPostal: profileData.CodPostal,
                    localidad: profileData.Localidad,
                    celular: profileData.Celular,
                    paquete: profileData.Paquete,
                }
            });

            
            dispatch({
                type: 'addMessageProfile',
                payload: 'Perfil de vendedor actualizado.'
            });
            
            /*Obtengo los datos actualizados*/
            setProfile(resp.data);


        } catch (error) {
            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProfile',
                payload: err.response?.data,
            });
        }
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
                type: 'addMessageProfile',
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
                type: 'addMessageProfile',
                payload: err.response?.data,
            });
        }
    };



    /** Limpia los errores para poder reutilizarlos
     * y cerrar las alertas
     */
    const removeErrorProfile =  () => {
        dispatch({ 
            type: 'removeErrorProfile',
        });
    };




    const validateProfileForm = (dataUser: ProfileModify, grupoCuenta: string) => {

        let validate: object = {
            status: true,
            msg: '',
        };


        Object.entries(dataUser).forEach(([key, value]) =>  {

            if( key !== 'Paquete')
            {
                if( key !== 'Clave')
                {
                    if(!Boolean(value)){
        
                        validate = {
                            status: false,
                            msg: `Complete el campo ${key}`
                        }
                    }
                }
            }else{

                if( grupoCuenta === constantes.regionAmba && !Boolean(value)){
                    validate = {
                        status: false,
                        msg: 'Complete el campo Paquete',
                    };
                }
            }

            if(key === 'Celular')
            {
                if(!constantes.celularRegex.test(value)){
                    validate = {
                        status: false,
                        msg: 'El formato del Celular es incorrecto',
                    }
                }
            }
        });

        return validate;
    }


    
    /** Generamos la insignia del logo del perfil */
    const getInsigneName = async() => {

        const userData  = await AsyncStorage.getItem('userData');
        const { dataUser } = JSON.parse(userData || '{}');
        const insigneName =  (dataUser.Nombre.charAt(0) + dataUser.Apellido.charAt(0)).toUpperCase();
        setInsigne(insigneName);
    }


    return(
        <UserContext.Provider value = {{
            ...state,
            isLoading,
            profile,
            insigne,
            getProfile,
            editProfile,
            removeErrorProfile,
            getCuentasMadres,
            getCuentasHijas,
        }}>

            { children }

        </UserContext.Provider>
    );

}