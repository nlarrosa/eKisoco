import { createContext, useReducer, useState, useContext } from "react"
import { AxiosError } from 'axios';

import { ProfileModify, CuentasMadresData, CuentasHijasData, ProfileData, AccountData, AccountModify } from '../interfaces/userInterfaces';
import { userReducer, UserState } from '../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sgdi from "../api/Sgdi";
import constantes from '../constants/globals';
import { AuthContext } from './AuthContext';





type UserContextProps = {

    isLoading: boolean,
    profile: ProfileData | undefined,
    insigne: string,
    messageProfile: string,
    title: string,
    cuentasMadresData: CuentasMadresData[] | null,
    cuentasHijasData: CuentasHijasData[] | null,
    houersDays: {[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}},
    editProfile: (ProfileModify : ProfileModify, grupoCuenta:string) => void,
    removeErrorProfile: () => void,
    getCuentasMadres: (region: string) => void,
    getCuentasHijas:  (idCuentaMadre: string) => void,
    getProfile: (token:string, idCanilla:string) => Promise<ProfileData>,
    getAccount: () => Promise<AccountData>,
    asignHouersDays: (houersDays: {[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}}) => void;
    deleteHouersDay: (day: string) => void,
    editAccount: (accountModify: AccountModify, houers:{[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}}) => void,
    editHouers: (houers:{[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}}) => void,
    editZone: (accountModify: AccountModify) => void,
}


const  userInitialState: UserState = {
    
    messageProfile: '',
    title: '',
    cuentasMadresData: null,
    cuentasHijasData: null,
    houersDays: {},
}


export const UserContext = createContext( {} as UserContextProps );



export const UserProvider = ( { children }: any ) => {

    const { userId, token, dataUser } = useContext(AuthContext);
    const [ state, dispatch ]   = useReducer( userReducer, userInitialState);
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<ProfileData>();   
    const [insigne, setInsigne] = useState(''); 
    const [houersDays, setHouersDays] = useState<{[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}}>({});
    
    
    const [createHouers, setCreateHouers] = useState<{ [key:string]: string }>({
        Lunes:'', Martes:'', Miercoles:'', Jueves:'', Viernes:'', Sabado:'', Domingo:''
    });


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



    /** Retorna los datos de la cuenta del canilla con horarios
     * dias de reparto, tipos de servicios
     */
    const getAccount = async() => {

        setIsLoading(true);

        const resp = await Sgdi.get<AccountData>('/Canillas/ObtenerCanillaAdicional', {
            params: { 
                token, 
                idCanilla: userId
            }
        });

        setIsLoading(false);
        return resp.data;
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
                payload: {
                    messageProfile: constantes.profileUpdateMsg,
                    title: constantes.titleAttention
                }
            });
            
            /*Obtengo los datos actualizados*/
            setProfile(resp.data);


        } catch (error) {
            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProfile',
                payload: {
                    messageProfile: err.response?.data,
                    title: constantes.titleError,
                }
            });
        }
    }



    /** Recibimos los datos generales y totales para 
     * editar o guardar parametros de la cuenta del usuario
     */
    const editAccount = async(accountModify: AccountModify, houers: {[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}}) => {

        try {
            const responseAccount = await Sgdi.put('Canillas/ActualizarCanillaAdicional', null, {
                params: {
                    token,
                    idCanilla: userId,
                    DNI: accountModify.Dni,
                    CUIT: accountModify.Cuit,
                    Provincia: accountModify.Provincia,
                    EntrecallesPuesto: accountModify.Calles,
                    tieneReparto: accountModify.reparto,
                    entregaSuscripcionDiario: accountModify.entregaDiario,
                    entregaSuscripcionRevistas: accountModify.entregaRevista,
                    cargaDiario: accountModify.cargaDiario,
                    cargaRevista: accountModify.cargaRevista,
                    cargaOpcionales: accountModify.cargaOpcionales
                }
            });


            editZone(accountModify);
            editHouers(houers);

            dispatch({
                type: 'addMessageProfile',
                payload: { 
                    messageProfile: constantes.accountUpdateMsg,
                    title: constantes.titleAttention
                }
            });

            
        } catch (error) {

            const err = error as AxiosError;
            dispatch({
                type: 'addMessageProfile',
                payload: {
                    messageProfile: err.response?.data,
                    title: constantes.titleError,
                }
            });
            
        }
    }



    /** Editar y guaradr los datos de la cuenta 
     * la seccion zona de reparto */
    const editZone = async(accountModify: AccountModify) => {

        const responseZone = await Sgdi.put('Canillas/ActualizarCanillaZonaReparto', null, {
            params: {
                token,
                IdCanilla: userId,
                calle01: accountModify.calle1,
                calle02: accountModify.calle2,
                calle03: accountModify.calle3,
                calle04: accountModify.calle4,
                calle05: accountModify.calle5,
                calle06: accountModify.calle6,
                calle07: accountModify.calle7,
                calle08: accountModify.calle8,
                calle09: accountModify.calle9,
                calle10: accountModify.calle10,
            }
        });
    }


    /** Editar y guaradr los datos de la cuenta 
     * la seccion horario de atencion */
    const editHouers = (houers: {[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}}) => {

        const houersAtention: Object[] = Object.entries(houers).map(([ key, day]) => {
            return day.desde + ' - ' + day.hasta;
        });

        const responseHouers = Sgdi.put('Canillas/ActualizarCanillaHorarios', null, {
            params: {
                token,
                idCanilla: userId,
                lunes: houersAtention[0],
                martes: houersAtention[1],
                miercoles: houersAtention[2],
                jueves: houersAtention[3],
                viernes: houersAtention[4],
                sabado: houersAtention[5],
                domingo: houersAtention[6],
            }
        });
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
                payload: {
                    messageProfile: err.response?.data,
                    title: constantes.titleError,
                }
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
                    grupoCuenta: constantes.regionInterior,
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
                payload: {
                    messageProfile: err.response?.data,
                    title: constantes.titleError,
                }
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
                        msg: constantes.requiredPakageMsg,
                    };
                }
            }

            if(key === 'Celular')
            {
                if(!constantes.celularRegex.test(value)){
                    validate = {
                        status: false,
                        msg: constantes.invalidPhoneMsg,
                    }
                }
            }
        });

        return validate;
    }


    
    /** Generamos la insignia del logo del perfil */
    const getInsigneName = async() => {

        
        const insigneName =  (dataUser?.Nombre.charAt(0) + dataUser.Apellido.charAt(0)).toUpperCase();
        setInsigne(insigneName);
    }



    /** Generamos los datos de los horarios de atencion
     * para giardar en el context
     */
    const asignHouersDays = ( houersDaysData: {[key: string]: { desde:string, hasta:string, status:boolean, color: string, name:string}}) => {

        setHouersDays(houersDaysData);
        dispatch({ type: 'houersDaysData', payload: houersDaysData });
        
    }



    
    /**Eliminamos un dia y horario desde la lista 
     * de horarios de atencion
     */
    const deleteHouersDay = (key: string) => {
      
        houersDays[key].desde = '';
        houersDays[key].hasta = '';
        setHouersDays(houersDays);
        dispatch({ type: 'houersDaysData', payload: houersDays });
    }

    




    return(
        <UserContext.Provider value = {{
            ...state,
            isLoading,
            profile,
            insigne,
            houersDays,
            getProfile,
            getAccount,
            editProfile,
            removeErrorProfile,
            getCuentasMadres,
            getCuentasHijas,
            asignHouersDays,
            deleteHouersDay,
            editAccount,
            editHouers,
            editZone
        }}>

            { children }

        </UserContext.Provider>
    );

}