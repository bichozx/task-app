import axios from 'axios';
import gConf from '../conf/conf';

const deleteTask = (taskId, token) => {
  const AuthStr = `Bearer ${token}`;

 
  const config = {
    headers: {
      'accept-version': '1.0',
      'authorization': AuthStr,
    },
  };

  
  return axios
    .delete(`${gConf.urlApi}/api/tasks/${taskId}`, config)
    .catch((error) => {
      
      throw new Error(`Error al eliminar la tarea: ${error.message}`);
    });
};

export default deleteTask;
