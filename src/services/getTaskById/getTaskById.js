import axios from 'axios';
import gConf from '../conf/conf';

const getTaskById = (token, taskId) => {
  const AuthStr = `Bearer ${token}`;

  
  const headersConfig = {
    headers: {
      'accept-version': '1.0',
      'authorization': AuthStr,
    },
  };

  
  return axios
    .get(`${gConf.urlApi}/api/tasks/${taskId}`, headersConfig)
    .then((response) => {
      return response.data; 
    })
    .catch((error) => {
      
      throw new Error(`Error al obtener la tarea con ID ${taskId}: ${error.message}`);
    });
};

export default getTaskById;
