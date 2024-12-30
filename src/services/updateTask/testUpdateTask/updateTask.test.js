import '@testing-library/jest-dom';

import axios from 'axios';
import gConf from '../../conf/conf';
import updateTask from '../updateTask';

jest.mock('axios');

describe('updateTask', () => {
  const mockToken = 'fake-token';
  const mockTask = { _id: '1', title: 'Tarea actualizada', description: 'Descripción actualizada' };

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('debe hacer una solicitud PUT a la API con los datos correctos', async () => {
    const mockUpdatedTask = { _id: '1', title: 'Tarea actualizada', description: 'Descripción actualizada' };

    
    axios.put.mockResolvedValueOnce({ data: mockUpdatedTask });

    const result = await updateTask(mockTask, mockToken);

    
    expect(axios.put).toHaveBeenCalledWith(
      `${gConf.urlApi}/api/tasks/${mockTask._id}`,
      mockTask,
      {
        headers: {
          'accept-version': '1.0',
          'authorization': `Bearer ${mockToken}`,
        },
      }
    );

   
    expect(result).toEqual(mockUpdatedTask);
  });

  it('debe manejar los errores si la solicitud PUT falla', async () => {
    const mockError = new Error('Error al actualizar la tarea');
    axios.put.mockRejectedValueOnce(mockError);

    
    await expect(updateTask(mockTask, mockToken)).rejects.toThrow('Error al actualizar la tarea');
  });
});
