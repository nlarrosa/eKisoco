import { createContext, useReducer, useEffect } from "react";
import {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { LoginResponse, loginData, forgotPass, CanillaResponse } from '../interfaces/loginInterfaces';
import { AuthState, authReducer } from '../reducers/authReducer';
import Sgdi from '../api/Sgdi';
import constantes from '../constants/globals';
import axios from 'axios';
import { RegisterData } from '../interfaces/userInterfaces';




type AuthContextProps = {
    
    errorMessage: string,
    errorForgot: string,
    errorSignup: string,
    userId: string | null,
    dataUser: CanillaResponse | null,
    token: string | null,
    enabledReposity: boolean,
    status: 'checking' | 'authenticated' | 'no-authenticated' | null,
    signIn:  (loginData : loginData) => void,
    signUp:  (datauser : RegisterData, region: string, distribuidor: string, bases: boolean) => void,
    logOut:  () => void,
    removeError: () => void,
    forgotPassword: (forgotPass: forgotPass) => void,
    
}


const authInitialState: AuthState = {
    errorMessage: '',
    errorForgot: '',
    errorSignup: '',
    userId: null,
    dataUser: null,
    token: null,
    enabledReposity: false,
    status: 'checking',
}





export const AuthContext = createContext( {} as AuthContextProps );


export const AuthProvider = ({ children }: any ) => {
    
    const [state, dispatch] = useReducer(authReducer, authInitialState)
    


    useEffect(() => {
      validToken();
    }, []);


    
    const validToken = async() => {
        const userData = await AsyncStorage.getItem('userData');
        const { token, userId, enabledReposity, dataUser} = JSON.parse(userData || '{}');

        if(!token) 
        return dispatch({ type: 'NoAuthenticated' });

        dispatch({ 
            type: 'signIn', 
            payload: {
                token,
                userId,
                dataUser,
                enabledReposity,
            }
        });
    }
    

    /** Action Login para obtener el estado y la 
     * data del user logueado
    */
    const signIn = async({ mail, clave }: loginData) => {

        try {

            if(mail.length === 0 || clave.length === 0){
                dispatch({ type: 'addError', payload: 'Complete los campos obligatorios'});
                return;
            }

            if(!constantes.emailRegex.test(mail)){
                dispatch({ type: 'addError', payload: 'El campo Email es incorrecto'});
                return;
            }
            

            const { data } = await Sgdi.get<LoginResponse>('/Login', { 
                params: {
                    mail, 
                    clave
                } 
            });
            

            const response = await Sgdi.get<CanillaResponse>('/Canillas', { 
                params: { 
                    token: data.Token, 
                    idCanilla: data.IdCanilla 
                }
            });


            dispatch({ 
                type: 'signIn', 
                payload: {
                    token: data.Token,
                    userId: data.IdCanilla,
                    dataUser:response.data,
                    enabledReposity: response.data.HabilitadoRepo,
                }
            });

            await AsyncStorage.setItem('userData', 
                JSON.stringify({
                    token: data.Token,
                    userId: data.IdCanilla,
                    dataUser: response.data,
                    enabledReposity: response.data.HabilitadoRepo,
                })
            );


        } catch (error) {
            
            const err = error as AxiosError;

            dispatch({
                type: 'addError',
                payload: err.response?.data || 'Informacion Incorrecta',
            });
        }
    };



    /** Registra un nuevo usuario y ejecuta el login
     * de acceso al mismo tiempo
     */
    const signUp = ( datauser : RegisterData, region: string, distribuidor: string, bases: boolean ) => {

        try {

            const validate: any = validateForm(datauser, region, distribuidor);
            
            if(!validate.status){
                dispatch({ type: 'addErrorSignup', payload: validate.msg });
                return;
            }
            
            if(!bases){
                dispatch({type: 'addErrorSignup', payload: 'Debe aceptar los términos y condiciones'});
                return;
            }
            
            
            let cuentaHija;
            (region === constantes.regionInterior) 
            ? cuentaHija = datauser.Localidad : cuentaHija = distribuidor;
            
            const registerUSer = axios.post('/Canillas', {
                params: {
                    mail: datauser.Email,
                    clave: datauser.Clave,
                    apellido: datauser.Apellido,
                    nombre: datauser.Nombre,
                    direccion: datauser.Direccion,
                    codPostal: datauser.CodPostal,
                    celular: datauser.Celular,
                    idMedioDeEntregaPadre: distribuidor,
                    nroCuentaHija: cuentaHija,
                    localidad: datauser.Localidad,
                    paquete: datauser.Paquete,
                }
            });
            
        } catch (error) {

            const err = error as AxiosError; 
            dispatch({
                type: 'addErrorSignup', 
                payload: err.response?.data
            });
            return;
        }
    };


    /** Logout de usuario eliminando storage
     * y distintos estados 
     */
    const logOut = () => {

        AsyncStorage.removeItem('userData');

        dispatch({ 
            type: 'logout' 
        });
    };


    /** Remuevo el error para que vuelva a funcionar
     * la alerta del login
     */
    const removeError = () => {

        dispatch({
            type: 'removeError',
        });
    };


    /** Formulario para recuperar la contraseña
     * el email se envia segun endpoint Api
     */
    
    const forgotPassword = async({ mail }: forgotPass) => {
        
        try {

            if(!mail || !constantes.emailRegex.test(mail)){
                dispatch({ type: 'addErrorForgot', payload: 'Ingrese un email válido' });
                return;
            } 

            const resp = await Sgdi.post('/Login/BlanquearContraseña', { 
                params: { mail }
            });
            
        } catch ({ response }) {
            
            // const err = error as AxiosError;
            // console.log(JSON.stringify(response));
            // dispatch({
            //     type: 'addErrorForgot',
            //     payload: err.response?.data || 'Informacion Incorrecta',
            // });
        }
    };


    

    /** validamos los campos del form segun restricciones
     * solicitadas en documentacion
     */
    const validateForm = (datauser: object, region: string, distri: string): object => {
        
        let  clave: string = '';

        let validate: object = {
            status: true,
            msg: '',
        };

        Object.entries(datauser).forEach(([key, value]) =>  {

            if( key === 'Clave') { clave = value; }

            if(key !== 'Localidad'){ 
                
                if( key !== 'Paquete'){

                    if(!Boolean(value) || !Boolean(region) || !Boolean(distri))
                    {

                        validate = {
                            status: false,
                            msg: 'Complete los campos obligatorios',
                        };
                    }

                    if( key === 'Email'){
                        if(!constantes.emailRegex.test(value)){
                            validate = {
                                status: false,
                                msg: 'Ingrese un Email válido',
                            };
                        }
                    }

                    if( key === 'ReClave'){

                        if( value !== clave ){
                            validate = {
                                status: false,
                                msg: 'Las Claves ingresadas no coinciden'
                            }
                        }
                    }

                }else {

                    if( region === constantes.regionAmba && !Boolean(value))
                    {
                        validate = {
                            status: false,
                            msg: 'Complete el campo Paquete',
                        };
                    }
                }
            }
        });

        return validate;
    };


    return(
        <AuthContext.Provider value = {{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
            forgotPassword,
        }}>
       { children }
        </AuthContext.Provider>
    )
}