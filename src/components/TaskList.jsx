import React, { useContext, useEffect, useState } from 'react';

import FilterTasks from './FilterTask';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { tasks, toggleTaskStatus, deleteTask, getAllTasks, error } =
    useContext(TaskContext);

    

  const getFilteredTasks = (tasks, filter) => {
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    if (filter === 'pending') return tasks.filter((task) => !task.completed);
    return tasks; 
  };

  const filteredTasks = getFilteredTasks(tasks, filter);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      await getAllTasks(); 
      setIsLoading(false);
    };

    loadTasks();
  }, [getAllTasks]);

  const handleToggleStatus = (taskId) => toggleTaskStatus(taskId);
  const handleDelete = (taskId) => deleteTask(taskId);

  return (
    <div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="mb-4 animate-fade-in p-4">
        <FilterTasks activeFilter={filter} onFilterChange={setFilter} />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            taskId={task._id}
            handleToggleStatus={() => handleToggleStatus(task._id)}
            handleDelete={() => handleDelete(task._id)}
          />
        ))
      ) : (
          <p className="text-center text-gray-500 mt-4">
            No hay tareas para mostrar
          </p>
        )}
      </div>
    
  );
};

export default TaskList;
