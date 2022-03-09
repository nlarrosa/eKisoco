import axios from "axios";

const baseURL = 'https://q-sgdiwebapi.lanacion.com.ar/api';


const Sgdi = axios.create({ 
    baseURL,
    timeout: 12000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    // withCredentials: true,
    // httpsAgent: new https.Agent({keepAlive:true}),
});

export default Sgdi;