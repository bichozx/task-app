import '@testing-library/jest-dom';

import gConf from '../conf'; // Importa el archivo de configuración

describe('Configuración de la API', () => {
  it('debe tener la URL de la API definida', () => {
    expect(gConf.urlApi).toBeDefined();
    expect(gConf.urlApi).toBe('https://taskapimanager.onrender.com');
  });
});
