import '@testing-library/jest-dom';

import axios from 'axios';
import gConf from '../../conf/conf';
import getTaskById from '../getTaskById';

jest.mock('axios');

describe('getTaskById', () => {
  const mockToken = 'fake-token';
  const mockTaskId = 1;

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('debe hacer una solicitud GET a la API con el ID de la tarea correcto', async () => {
    const mockTask = { id: 1, title: 'Tarea 1', description: 'Descripción 1' };

    
    axios.get.mockResolvedValueOnce({ data: mockTask });

    const result = await getTaskById(mockToken, mockTaskId);

    
    expect(axios.get).toHaveBeenCalledWith(
      `${gConf.urlApi}/api/tasks/${mockTaskId}`,
      {
        headers: {
          'accept-version': '1.0',
          'authorization': `Bearer ${mockToken}`,
        },
      }
    );

    
    expect(result).toEqual(mockTask);
  });

  it('debe manejar los errores si la solicitud GET falla', async () => {
    const mockError = new Error('Error al obtener la tarea');
    axios.get.mockRejectedValueOnce(mockError);

    
    await expect(getTaskById(mockToken, mockTaskId)).rejects.toThrow(
      `Error al obtener la tarea con ID ${mockTaskId}: Error al obtener la tarea`
    );
  });
});
