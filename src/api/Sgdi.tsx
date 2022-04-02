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
});

export default Sgdi;