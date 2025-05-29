import axios from 'axios';

const { data } = await axios.post('http://localhost:8000', { username: 'Joaquín', email: 'joaquin@email.com', password: 'password' });

console.log(data);
