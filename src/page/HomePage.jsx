import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded p-6 w-full max-w-4xl">
          <div className="animate-fade-in">
            <TaskForm />
          </div>

          <div className="animate-fade-in mt-4">
            <TaskList />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
