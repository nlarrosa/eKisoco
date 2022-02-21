import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { LoginResponse, loginData } from '../interfaces/loginInterfaces';
import { AuthState, authReducer } from '../reducers/authReducer';
import Sgdi from '../api/Sgdi';




type AuthContextProps = {

    errorMessage: string,
    userId: string | null,
    token: string | null,
    enabledReposity: boolean,
    status: 'checking' | 'authenticated' | 'no-authenticated',
    signIn:  (loginData : loginData) => void,
    signUp: () => void,
    logOut:  () => void,
    removeError: () => void,

}


const authInitialState: AuthState = {
    errorMessage: '',
    userId: null,
    token: null,
    enabledReposity: false,
    status: 'checking',
}


export const AuthContext = createContext( {} as AuthContextProps );

export const Authprovider = ({ children }: any ) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState)


    useEffect(() => {
      validToken();
    }, []);
    

    const validToken = async() => {
        const userData = await AsyncStorage.getItem('userData');
        const { token, userId, enabledReposity} = JSON.parse(userData || '{}');

        if(!token) 
        return dispatch({ type: 'NoAuthenticated' });

        dispatch({ 
            type: 'signIn', 
            payload: {
                token,
                userId,
                enabledReposity,
            }
        });
    }
    

    /** Action Login para obtener el estado y la 
     * data del user logueado
    */
    const signIn = async({ mail, clave }: loginData) => {

        try {

            const { data } = await Sgdi.get<LoginResponse>('/Login', { params: {mail, clave} });
            dispatch({ 
                type: 'signIn', 
                payload: {
                    token: data.Token,
                    userId: data.IdCanilla,
                    enabledReposity: true
                }
            });

            await AsyncStorage.setItem('userData', 
                JSON.stringify({
                    token: data.Token,
                    userId: data.IdCanilla,
                    enabledReposity: true,
                })
            );

        } catch (data) {
            
            dispatch({
                type: 'addError',
                payload: JSON.stringify(data) || 'Informacion Incorrecta',
            });
        }

    };


    const signUp = () => {};


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

    

    return(
        <AuthContext.Provider value = {{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
       { children }
        </AuthContext.Provider>
    )

}