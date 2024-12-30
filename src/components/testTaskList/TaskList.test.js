import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskList from '../TaskList';

describe('TaskList Component', () => {
  const mockToggleTaskStatus = jest.fn();
  const mockDeleteTask = jest.fn();

  const renderWithContext = (tasks, error = null) => {
    render(
      <TaskContext.Provider
        value={{
          tasks,
          toggleTaskStatus: mockToggleTaskStatus,
          deleteTask: mockDeleteTask,
          error,
        }}
      >
        <TaskList />
      </TaskContext.Provider>
    );
  };

  const tasks = [
    {
      _id: '1',
      title: 'Tarea 1',
      description: 'Descripción de tarea 1',
      completed: false,
    },
    {
      _id: '2',
      title: 'Tarea 2',
      description: 'Descripción de tarea 2',
      completed: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe renderizar la lista de tareas correctamente', () => {
    renderWithContext(tasks);

    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.getByText(/Descripción de tarea 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Descripción de tarea 2/i)).toBeInTheDocument();
  });

  it('debe cambiar el filtro y mostrar tareas filtradas', () => {
    renderWithContext(tasks);

    const completedFilterButton = screen.getByRole('button', {
      name: /Completadas/i,
    });
    fireEvent.click(completedFilterButton);

    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.queryByText('Tarea 1')).not.toBeInTheDocument();
  });

  it('debe mostrar un mensaje cuando no hay tareas para el filtro seleccionado', async () => {
    renderWithContext(tasks);

    const pendingFilterButton = screen.getByRole('button', {
      name: /Pendientes/i,
    });
    fireEvent.click(pendingFilterButton);

    const completedFilterButton = screen.getByRole('button', {
      name: /Completadas/i,
    });
    fireEvent.click(completedFilterButton);

    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.queryByText('Tarea 1')).not.toBeInTheDocument();

    fireEvent.click(pendingFilterButton);

    
    await waitFor(() => {
      expect(
        screen.getByText(/No hay tareas para mostrar/i)
      ).toBeInTheDocument();
    });
  });

  it('debe manejar el mensaje de error si existe', () => {
    const errorMessage = 'Hubo un error al cargar las tareas.';
    renderWithContext([], errorMessage);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('debe mostrar un mensaje si no hay tareas', () => {
    renderWithContext([]);

    expect(screen.getByText(/No hay tareas para mostrar/i)).toBeInTheDocument();
  });
});
