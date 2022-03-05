import axios from "axios";

const baseURL = 'https://q-sgdiwebapi.lanacion.com.ar/api';

const Sgdi = axios.create({ 
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
});

export default Sgdi;