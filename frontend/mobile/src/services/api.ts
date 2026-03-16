import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', // En emulador Android, 10.0.2.2 apunta a tu localhost
});

export default api;