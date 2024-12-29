import React, { useContext, useState } from 'react';

import { TaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { addTask } = useContext(TaskContext);

  const validateForm = () => title.trim() && description.trim();

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      await addTask({ title, description });
      resetForm();
      resetForm();
      setSuccessMessage('Tarea agregada con éxito');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      alert('Error al agregar la tarea');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="p-2 mb-4 text-center bg-green-100 text-green-800 rounded-md shadow-md">
          {successMessage}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <label htmlFor="title" className="sr-only">
          Título de la tarea
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={`border ${
            !title.trim() ? 'border-red-500' : 'border-gray-300'
          } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full`}
          value={title}
          onChange={handleChange}
          placeholder="Título de la tarea"
          aria-label="Título de la tarea"
        />

        <label htmlFor="description" className="sr-only">
          Descripción de la tarea
        </label>
        <textarea
          id="description"
          name="description"
          className={`border ${
            !description.trim() ? 'border-red-500' : 'border-gray-300'
          } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full`}
          value={description}
          onChange={handleChange}
          placeholder="Descripción de la tarea"
          rows="4"
          aria-label="Descripción de la tarea"
        />

        <button
          className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full sm:w-auto mx-auto"
          type="submit"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
