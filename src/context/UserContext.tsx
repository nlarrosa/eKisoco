import { createContext, useReducer } from "react"
import { ProfileData } from '../interfaces/userInterfaces';
import { userReducer, UserState } from '../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';



type UserContextProps = {

    messageProfile: string | null,
    userData: ProfileData | null,
    getProfile:  () => void,
    editProfile: (apellido: any) => void,
    editAccount: () => void,
    removeMessaggeProfile: () => void,
}


const  userInitialState: UserState = {
    messageProfile: '',
    userData: null,
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
    const editProfile =  async( Apellido: any ) => {

        console.log(Apellido);
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
        }}>

            { children }

        </UserContext.Provider>
    );

}