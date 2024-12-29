import axios from 'axios';
import gConf from '../conf/conf';

const createTask = (task, token) => {
  const AuthStr = `Bearer ${token}`;
  
  
  const config = {
    headers: {
      'accept-version': '1.0',
      'authorization': AuthStr,
    },
  };

  
  return axios
    .post(`${gConf.urlApi}/api/tasks`, task, config)
    .then((response) => {
      
      return response.data;
    })
    .catch((error) => {
      
      throw new Error(`Error al agregar tarea: ${error.message}`);
    });
};

export default createTask;
