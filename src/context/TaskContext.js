import React, { createContext, useEffect, useState } from 'react';

import createTask from '../services/createTask/createTask';
import deleteTask from '../services/deleteTask/deleteTask';
import getAllTasks from '../services/getTask/getAllTask';
import updateTask from '../services/updateTask/updateTask';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllTasks()
      .then((data) => {
        if (Array.isArray(data.tasks)) {
          const sortedTasks = data.tasks.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setTasks(sortedTasks);
        } else {
          console.error('Los datos no tienen la estructura esperada', data);
          setError('Error al cargar las tareas');
        }
      })
      .catch((err) => {
        console.error('Error al obtener las tareas:', err);
        setError('Error al obtener las tareas');
      });
  }, []);

  const fetchAndSetTasks = () => {
    return getAllTasks() 
      .then((data) => {
        if (Array.isArray(data.tasks)) {
          const sortedTasks = data.tasks.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setTasks(sortedTasks);
        } else {
          console.error(
            'Error: Los datos no tienen la estructura esperada',
            data
          );
          setError('Error al cargar las tareas');
        }
      })
      .catch((err) => {
        console.error('Error al obtener las tareas:', err);
        setError('Error al obtener las tareas');
      });
  };

  const addTask = (task) => {
    createTask(task)
      .then(() => {
        fetchAndSetTasks().catch((err) => {
          console.error('Error al obtener las tareas después de agregar', err);
          setError('Error al obtener las tareas después de agregar');
        });
      })
      .catch((err) => {
        console.error('Error al agregar tarea:', err);
        setError('Error al agregar la tarea');
      });
  };

  const editTask = (id, updatedFields) => {
    updateTask({ _id: id, ...updatedFields })
      .then(() => {
        fetchAndSetTasks().catch((err) => {
          console.error('Error al obtener las tareas después de editar', err);
          setError('Error al obtener las tareas después de editar');
        });
      })
      .catch((err) => {
        console.error('Error al editar la tarea:', err);
        setError('Error al editar la tarea');
      });
  };

  const removeTask = (id) => {
    deleteTask(id)
      .then(() => {
        fetchAndSetTasks().catch((err) => {
          console.error('Error al obtener las tareas después de eliminar', err);
          setError('Error al obtener las tareas después de eliminar');
        });
      })
      .catch((err) => {
        console.error('Error al eliminar tarea:', err);
        setError('Error al eliminar la tarea');
      });
  };

  const toggleTaskStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );

    const task = tasks.find((t) => t._id === id);
    if (task) {
      const updatedFields = { _id: id, completed: !task.completed };
      updateTask(updatedFields).catch((err) => {
        console.error('Error al actualizar la tarea:', err);
        setError('Error al actualizar el estado de la tarea');
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskStatus, removeTask, editTask, error }}
    >
      {children}
    </TaskContext.Provider>
  );
};
