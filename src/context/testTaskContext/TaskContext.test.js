import '@testing-library/jest-dom';

import { TaskContext, TaskProvider } from '../TaskContext';
import { render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import { act } from '@testing-library/react';
import createTask from '../../services/createTask/createTask';
import deleteTask from '../../services/deleteTask/deleteTask';
import getAllTasks from '../../services/getTask/getAllTask';
import updateTask from '../../services/updateTask/updateTask';

jest.mock('../../services/createTask/createTask');
jest.mock('../../services/deleteTask/deleteTask');
jest.mock('../../services/getTask/getAllTask');
jest.mock('../../services/updateTask/updateTask');

describe('TaskContext', () => {
  const mockTasks = [
    { _id: '1', title: 'Task 1', description: 'Desc 1', completed: false, createdAt: '2024-12-28T10:00:00Z' },
    { _id: '2', title: 'Task 2', description: 'Desc 2', completed: true, createdAt: '2024-12-27T10:00:00Z' },
  ];

  const renderWithProvider = (children) => {
    render(<TaskProvider>{children}</TaskProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe cargar tareas al montarse', async () => {
    getAllTasks.mockResolvedValueOnce({ tasks: mockTasks });

    renderWithProvider(
      <TaskContext.Consumer>
        {(value) => (
          <>
            {value.tasks.map((task) => (
              <p key={task._id}>{task.title}</p>
            ))}
          </>
        )}
      </TaskContext.Consumer>
    );

    expect(await screen.findByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(getAllTasks).toHaveBeenCalledTimes(1);
  });

  it('debe manejar errores al cargar tareas', async () => {
    getAllTasks.mockRejectedValueOnce(new Error('Error al obtener tareas'));

    renderWithProvider(
      <TaskContext.Consumer>
        {(value) => <p>{value.error}</p>}
      </TaskContext.Consumer>
    );

    expect(await screen.findByText('Error al obtener las tareas')).toBeInTheDocument();
    expect(getAllTasks).toHaveBeenCalledTimes(1);
  });

  it('debe agregar una tarea', async () => {
    createTask.mockResolvedValueOnce({});
    getAllTasks.mockResolvedValueOnce({ tasks: mockTasks });

    const newTask = { title: 'Task 3', description: 'Desc 3' };

    renderWithProvider(
      <TaskContext.Consumer>
        {(value) => {
          value.addTask(newTask);
          return null;
        }}
      </TaskContext.Consumer>
    );

    expect(createTask).toHaveBeenCalledWith(newTask);
    expect(getAllTasks).toHaveBeenCalledTimes(1);
  });

  it('debe editar una tarea', async () => {
    updateTask.mockResolvedValueOnce({});
    getAllTasks.mockResolvedValueOnce({ tasks: mockTasks });

    const updatedFields = { title: 'Updated Task 1' };

    renderWithProvider(
      <TaskContext.Consumer>
        {(value) => {
          value.editTask('1', updatedFields);
          return null;
        }}
      </TaskContext.Consumer>
    );

    expect(updateTask).toHaveBeenCalledWith({ _id: '1', ...updatedFields });
    expect(getAllTasks).toHaveBeenCalledTimes(1);
  });

  it('debe eliminar una tarea', async () => {
    deleteTask.mockResolvedValueOnce({});
    getAllTasks.mockResolvedValueOnce({ tasks: mockTasks });

    renderWithProvider(
      <TaskContext.Consumer>
        {(value) => {
          value.removeTask('1');
          return null;
        }}
      </TaskContext.Consumer>
    );

    expect(deleteTask).toHaveBeenCalledWith('1');
    expect(getAllTasks).toHaveBeenCalledTimes(1);
  });

  it('debe alternar el estado de una tarea', async () => {
    updateTask.mockResolvedValueOnce({});
  
    renderWithProvider(
      <TaskContext.Consumer>
        {(value) => {
          
          act(() => {
            value.toggleTaskStatus('1');
          });
          
          const task = value.tasks.find((task) => task._id === '1');
          return <p>{task?.completed ? 'Completada' : 'Pendiente'}</p>;
        }}
      </TaskContext.Consumer>
    );
  
    
    await waitFor(() => {
      
      return new Promise((resolve) => setTimeout(resolve, 2000));
    });
  
    
    expect(screen.getByText('Completada')).toBeInTheDocument();
    expect(updateTask).toHaveBeenCalledWith({
      _id: '1',
      completed: true,
    });
  });
  
});
