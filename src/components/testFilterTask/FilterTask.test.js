import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import FilterTasks from '../FilterTask';
import React from 'react';

describe('FilterTasks Component', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear(); 
  });

  it('debe renderizar todos los botones de filtro', () => {
    render(
      <FilterTasks activeFilter="all" onFilterChange={mockOnFilterChange} />
    );

    
    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Completadas')).toBeInTheDocument();
    expect(screen.getByText('Pendientes')).toBeInTheDocument();
  });

  it('debe aplicar la clase activa al filtro seleccionado', () => {
    render(
      <FilterTasks activeFilter="completed" onFilterChange={mockOnFilterChange} />
    );

    const completedButton = screen.getByText('Completadas');
    const allButton = screen.getByText('Todas');

    
    expect(completedButton).toHaveClass('bg-teal-500 text-white');
    
    expect(allButton).not.toHaveClass('bg-teal-500 text-white');
  });

  it('debe llamar a la función onFilterChange con el filtro correcto', () => {
    render(
      <FilterTasks activeFilter="all" onFilterChange={mockOnFilterChange} />
    );

    const pendingButton = screen.getByText('Pendientes');

    
    fireEvent.click(pendingButton);

    
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith('pending');
  });

  it('debe manejar correctamente el estado de los botones de filtro', () => {
    render(
      <FilterTasks activeFilter="all" onFilterChange={mockOnFilterChange} />
    );

    
    expect(screen.getByText('Todas')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Completadas')).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(screen.getByText('Pendientes')).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });
});
