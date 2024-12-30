import '@testing-library/jest-dom';

import axios from 'axios';
import deleteTask from '../deleteTask';
import gConf from '../../conf/conf';

jest.mock('axios');

describe('deleteTask', () => {
  const mockTaskId = 1;
  const mockToken = 'fake-token';

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('debe hacer una solicitud DELETE a la API con los datos correctos', async () => {
   
    axios.delete.mockResolvedValueOnce({});

    await deleteTask(mockTaskId, mockToken);

    
    expect(axios.delete).toHaveBeenCalledWith(
      `${gConf.urlApi}/api/tasks/${mockTaskId}`,
      {
        headers: {
          'accept-version': '1.0',
          'authorization': `Bearer ${mockToken}`,
        },
      }
    );
  });

  it('debe manejar los errores si la solicitud DELETE falla', async () => {
    const mockError = new Error('Error al eliminar tarea');
    axios.delete.mockRejectedValueOnce(mockError);

    
    await expect(deleteTask(mockTaskId, mockToken)).rejects.toThrow('Error al eliminar la tarea: Error al eliminar tarea');
  });
});
