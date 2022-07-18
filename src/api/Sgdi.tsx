import axios from "axios";


const baseURL = 'https://sgdiwebapi.lanacion.com.ar/api';


const Sgdi = axios.create({ 
    baseURL,
    timeout: 120000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
});

export default Sgdi;