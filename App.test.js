import { render, screen } from '@testing-library/react';

import App from './src/App';

describe('App', () => {
  it('debe renderizar correctamente el componente HomePage', () => {
    render(<App />); // Renderiza el componente App

    // Verifica si el componente HomePage está en el documento
    const homePageElement = screen.getByText(/Contenido esperado en HomePage/i);
    expect(homePageElement).toBeInTheDocument();
  });
});
