import HomePage from './page/HomePage';
import React from 'react';

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-4xl">
        <HomePage/>
      </div>
      </div>
    </>
  );
};

export default App;
