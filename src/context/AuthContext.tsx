import { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { LoginResponse, loginData, forgotPass, CanillaResponse, registerData } from '../interfaces/loginInterfaces';
import { AuthState, authReducer } from '../reducers/authReducer';
import Sgdi from '../api/Sgdi';




type AuthContextProps = {

    errorMessage: string,
    errorForgot: string,
    userId: string | null,
    dataUser: CanillaResponse | null,
    token: string | null,
    enabledReposity: boolean,
    status: 'checking' | 'authenticated' | 'no-authenticated' | null,
    signIn:  (loginData : loginData) => void,
    signUp: () => void,
    logOut:  () => void,
    removeError: () => void,
    forgotPassword: (forgotPass: forgotPass) => void,

}


const authInitialState: AuthState = {
    errorMessage: '',
    errorForgot: '',
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
            
            dispatch({
                type: 'addError',
                payload: JSON.stringify(error) || 'Informacion Incorrecta',
            });
        }

    };


    /** Registra un nuevo usuario y ejecuta el login
     * de acceso al mismo tiempo
     */
    const signUp = async ( datauser : registerData ) => {

        try {

            
        } catch (error) {
            
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


    
    const forgotPassword = async({ mail }: forgotPass) => {

        try {

            if(!mail){

                dispatch({
                    type: 'addErrorForgot',
                    payload: 'Debe ingesar un email',
                });
            } else { 

                const resp = await Sgdi.post('/Login/BlanquearContraseña', { params: { mail }});
                console.log(resp);
            }

            
        } catch ({ message }) {
            
            dispatch({
                type: 'addErrorForgot',
                payload: JSON.stringify(message) || 'Informacion Incorrecta',
            });
        }
    }

    

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