import React, { useContext, useState } from 'react';

import FilterTasks from './FilterTask';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [filter, setFilter] = useState('all');
  const { tasks, toggleTaskStatus, deleteTask, error } =
    useContext(TaskContext);

  const getFilteredTasks = (tasks, filter) => {
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    if (filter === 'pending') return tasks.filter((task) => !task.completed);
    return tasks; // 'all'
  };

  const filteredTasks = getFilteredTasks(tasks, filter);

  const handleToggleStatus = (taskId) => toggleTaskStatus(taskId);
  const handleDelete = (taskId) => deleteTask(taskId);

  return (
    <div className="p-4">
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="mb-4 animate-fade-in">
        <FilterTasks activeFilter={filter} onFilterChange={setFilter} />
      </div>

      {filteredTasks.length > 0 ? (
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
