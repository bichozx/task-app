import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskForm from '../TaskForm';

describe('TaskForm Component', () => {
  const mockAddTask = jest.fn();

  const renderWithContext = () => {
    render(
      <TaskContext.Provider value={{ addTask: mockAddTask }}>
        <TaskForm />
      </TaskContext.Provider>
    );
  };

  beforeEach(() => {
    mockAddTask.mockClear(); 
    jest.useFakeTimers(); 
  });

  afterEach(() => {
    jest.useRealTimers(); 
  });

  it('debe renderizar los campos del formulario y el botón de envío', () => {
    renderWithContext();

    
    expect(screen.getByPlaceholderText('Título de la tarea')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descripción de la tarea')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agregar/i })).toBeInTheDocument();
  });

  it('debe mostrar un mensaje de error si se intenta enviar el formulario vacío', () => {
    renderWithContext();

    const submitButton = screen.getByRole('button', { name: /Agregar/i });

    
    fireEvent.click(submitButton);

    
    expect(mockAddTask).not.toHaveBeenCalled();

    
    expect(
      screen.getByText(/Por favor completa todos los campos/i)
    ).toBeInTheDocument();
  });

  it('debe llamar a addTask con los datos correctos al enviar el formulario', async () => {
    renderWithContext();

    const titleInput = screen.getByPlaceholderText('Título de la tarea');
    const descriptionInput = screen.getByPlaceholderText('Descripción de la tarea');
    const submitButton = screen.getByRole('button', { name: /Agregar/i });

  
    fireEvent.change(titleInput, { target: { value: 'Nueva Tarea' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descripción de la nueva tarea' } });

    
    fireEvent.click(submitButton);

    
    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'Nueva Tarea',
      description: 'Descripción de la nueva tarea',
    });
  });

  it('debe mostrar un mensaje de éxito después de agregar una tarea', async () => {
    renderWithContext();

    const titleInput = screen.getByPlaceholderText('Título de la tarea');
    const descriptionInput = screen.getByPlaceholderText('Descripción de la tarea');
    const submitButton = screen.getByRole('button', { name: /Agregar/i });

    
    fireEvent.change(titleInput, { target: { value: 'Tarea Exitosa' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descripción Exitosa' } });

    
    mockAddTask.mockResolvedValueOnce();

    
    fireEvent.click(submitButton);

    
    await screen.findByText('Tarea agregada con éxito');

    
    jest.advanceTimersByTime(10000);

  
    
  });

  it('debe resetear los campos del formulario después de agregar una tarea', async () => {
    renderWithContext();

    const titleInput = screen.getByPlaceholderText('Título de la tarea');
    const descriptionInput = screen.getByPlaceholderText('Descripción de la tarea');
    const submitButton = screen.getByRole('button', { name: /Agregar/i });

    
    fireEvent.change(titleInput, { target: { value: 'Nueva Tarea' } });
    fireEvent.change(descriptionInput, { target: { value: 'Nueva Descripción' } });

    
    fireEvent.click(submitButton);

    
    await waitFor(() => expect(mockAddTask).toHaveBeenCalledTimes(1));

    
    jest.advanceTimersByTime(10000);

    
  });
});
