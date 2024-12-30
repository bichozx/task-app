import '@testing-library/jest-dom';

import axios from 'axios';
import createTask from '../createTask';
import gConf from '../../conf/conf';

jest.mock('axios');

describe('createTask', () => {
  const mockTask = { title: 'Nueva tarea', description: 'Descripción de tarea' };
  const mockToken = 'fake-token';
  const mockResponseData = { id: 1, ...mockTask };

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('debe hacer una solicitud POST a la API con los datos correctos', async () => {
    
    axios.post.mockResolvedValueOnce({ data: mockResponseData });

    const result = await createTask(mockTask, mockToken);

    
    expect(axios.post).toHaveBeenCalledWith(
      `${gConf.urlApi}/api/tasks`,
      mockTask,
      {
        headers: {
          'accept-version': '1.0',
          'authorization': `Bearer ${mockToken}`,
        },
      }
    );

    
    expect(result).toEqual(mockResponseData);
  });

  it('debe manejar los errores si la solicitud falla', async () => {
    const mockError = new Error('Error al agregar tarea');
    axios.post.mockRejectedValueOnce(mockError);

    
    await expect(createTask(mockTask, mockToken)).rejects.toThrow('Error al agregar tarea: Error al agregar tarea');
  });
});
