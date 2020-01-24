import axios from 'axios';
//conectar a nossa api node
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;