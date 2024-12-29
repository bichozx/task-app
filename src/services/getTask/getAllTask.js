import axios from 'axios';
import gConf from '../conf/conf';

const getAllTasks = (token) => {
  const AuthStr = `Bearer ${token}`;

  
  const headersConfig = {
    headers: {
      'accept-version': '1.0',
      'authorization': AuthStr,
    },
  };

  
  return axios
    .get(`${gConf.urlApi}/api/tasks`, headersConfig)
    .then((response) => {
      return response.data; 
    })
    .catch((error) => {
      
      throw new Error(`Error al obtener las tareas: ${error.message}`);
    });
};

export default getAllTasks;
