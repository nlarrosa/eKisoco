import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://q-sgdiwebapi.lanacion.com.ar/api';


const Sgdi = axios.create({ 
    baseURL,
    timeout: 12000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    // withCredentials: false,
    // httpsAgent: new https.Agent({keepAlive:true}),
});

Sgdi.interceptors.request.use(

    async(config) => {
        const userData = await AsyncStorage.getItem('userData');
        const { token } = JSON.parse(userData || '{}');
        if ( token ) {
            config.headers['x-token'] = token;
        }
        return config;
    }
);

export default Sgdi;