import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from '../TaskItem';

describe('TaskItem Component', () => {
  const mockToggleTaskStatus = jest.fn();
  const mockRemoveTask = jest.fn();
  const mockEditTask = jest.fn();

  const renderWithContext = (task) => {
    render(
      <TaskContext.Provider
        value={{
          tasks: [task],
          toggleTaskStatus: mockToggleTaskStatus,
          removeTask: mockRemoveTask,
          editTask: mockEditTask,
        }}
      >
        <TaskItem taskId={task._id} />
      </TaskContext.Provider>
    );
  };

  const task = {
    _id: '1',
    title: 'Tarea de prueba',
    description: 'Descripción de la tarea',
    completed: false,
    createdAt: '2023-12-01T00:00:00.000Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe renderizar los detalles de la tarea', () => {
    renderWithContext(task);

    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByText('Descripción de la tarea')).toBeInTheDocument();
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
    expect(screen.getByText(/Creada el:/)).toBeInTheDocument();
  });

  it('debe llamar a toggleTaskStatus al hacer clic en "Marcar como completada"', () => {
    renderWithContext(task);

    const toggleButton = screen.getByRole('button', { name: /Marcar como completada/i });
    fireEvent.click(toggleButton);

    expect(mockToggleTaskStatus).toHaveBeenCalledTimes(1);
    expect(mockToggleTaskStatus).toHaveBeenCalledWith('1');
  });

  it('debe llamar a removeTask al hacer clic en "Eliminar"', () => {
    renderWithContext(task);

    const deleteButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(deleteButton);

    expect(mockRemoveTask).toHaveBeenCalledTimes(1);
    expect(mockRemoveTask).toHaveBeenCalledWith('1');
  });

  it('debe habilitar el modo de edición al hacer clic en "Editar"', () => {
    renderWithContext(task);

    const editButton = screen.getByRole('button', { name: /Editar/i });
    fireEvent.click(editButton);

    expect(screen.getByPlaceholderText('Nuevo título')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nueva descripción')).toBeInTheDocument();
  });

  it('debe guardar los cambios en la tarea al hacer clic en "Guardar"', () => {
    renderWithContext(task);

    const editButton = screen.getByRole('button', { name: /Editar/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByPlaceholderText('Nuevo título');
    const descriptionInput = screen.getByPlaceholderText('Nueva descripción');
    const saveButton = screen.getByRole('button', { name: /Guardar/i });

    
    fireEvent.change(titleInput, { target: { value: 'Título actualizado' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descripción actualizada' } });

    
    fireEvent.click(saveButton);

    expect(mockEditTask).toHaveBeenCalledTimes(1);
    expect(mockEditTask).toHaveBeenCalledWith('1', {
      title: 'Título actualizado',
      description: 'Descripción actualizada',
    });
  });

  it('debe mostrar "Tarea no encontrada" si no existe la tarea', () => {
    render(
      <TaskContext.Provider
        value={{
          tasks: [],
          toggleTaskStatus: mockToggleTaskStatus,
          removeTask: mockRemoveTask,
          editTask: mockEditTask,
        }}
      >
        <TaskItem taskId="2" />
      </TaskContext.Provider>
    );

    expect(screen.getByText('Tarea no encontrada')).toBeInTheDocument();
  });
});
