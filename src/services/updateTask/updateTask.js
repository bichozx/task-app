import axios from 'axios';
import gConf from '../conf/conf';

const updateTask = (task, token) => {
  
  const AuthStr = `Bearer ${token}`;
  const payload = {
    headers: {
      'accept-version': '1.0',
      authorization: AuthStr,
    },
    
  };

  return axios
    .put(`${gConf.urlApi}/api/tasks/${task._id}`, task, payload)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error al actualizar la tarea:', error);
      throw error;
    });
};

export default updateTask