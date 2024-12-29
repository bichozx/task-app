import React, { useContext, useEffect, useState } from 'react';

import { TaskContext } from '../context/TaskContext';

const TaskItem = ({ taskId }) => {
  const { tasks, toggleTaskStatus, removeTask, editTask } =
    useContext(TaskContext);

  const task = tasks.find((t) => t._id === taskId);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (task) {
      setNewTitle(task.title);
      setNewDescription(task.description);
    }
  }, [task]);

  if (!task) return <div>Tarea no encontrada</div>;

  const formattedDate = new Date(task.createdAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleToggleStatus = () => {
    toggleTaskStatus(task._id);
  };

  const handleRemoveTask = () => {
    removeTask(task._id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newTitle !== task.title || newDescription !== task.description) {
      const updatedFields = { title: newTitle, description: newDescription };
      editTask(task._id, updatedFields);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-4 max-w-4xl mx-auto transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
      <div className="sm:w-auto flex flex-col w-full">
        {isEditing ? (
          <div className="w-full sm:w-auto mx-auto flex flex-col sm:flex-row gap-4 mt-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Nuevo título"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Nueva descripción"
            />
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400 transition-colors"
            >
              Guardar
            </button>
          </div>
        ) : (
          <>
            <h3
              className={`text-xl font-semibold mb-2 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
            <p className="mt-2">{task.description}</p>
            <p>{task.completed ? 'Completada' : 'Pendiente'}</p>
            <p className="text-xs text-gray-500 mt-2">
              Creada el: {formattedDate}
            </p>

            <div className="w-full sm:w-auto mx-auto flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleToggleStatus}
                className={`w-full sm:w-auto mx-auto px-4 py-2 rounded-lg text-white ${
                  task.completed ? 'bg-yellow-500' : 'bg-teal-500'
                } hover:bg-teal-400 transition-colors`}
              >
                {task.completed
                  ? 'Marcar como pendiente'
                  : 'Marcar como completada'}
              </button>
              <button
                onClick={handleRemoveTask}
                className="w-full sm:w-auto mx-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={handleEdit}
                className="w-full sm:w-auto mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
              >
                Editar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
