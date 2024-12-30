import '@testing-library/jest-dom';

import axios from 'axios';
import gConf from '../../conf/conf';
import getAllTasks from '../getAllTask';

jest.mock('axios');

describe('getAllTasks', () => {
  const mockToken = 'fake-token';

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('debe hacer una solicitud GET a la API con los datos correctos', async () => {
    const mockTasks = [
      { id: 1, title: 'Tarea 1', description: 'Descripción 1' },
      { id: 2, title: 'Tarea 2', description: 'Descripción 2' },
    ];

    
    axios.get.mockResolvedValueOnce({ data: mockTasks });

    const result = await getAllTasks(mockToken);

    
    expect(axios.get).toHaveBeenCalledWith(
      `${gConf.urlApi}/api/tasks`,
      {
        headers: {
          'accept-version': '1.0',
          'authorization': `Bearer ${mockToken}`,
        },
      }
    );

   
    expect(result).toEqual(mockTasks);
  });

  it('debe manejar los errores si la solicitud GET falla', async () => {
    const mockError = new Error('Error al obtener tareas');
    axios.get.mockRejectedValueOnce(mockError);

    
    await expect(getAllTasks(mockToken)).rejects.toThrow('Error al obtener las tareas: Error al obtener tareas');
  });
});
