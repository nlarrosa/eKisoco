import axios from "axios";

const baseURL = 'https://q-sgdiwebapi.lanacion.com.ar/api';

const Sgdi = axios.create({ baseURL });

export default Sgdi;