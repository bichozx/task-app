import React from 'react';

const FilterTasks = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'Todas' },
    { key: 'completed', label: 'Completadas' },
    { key: 'pending', label: 'Pendientes' },
  ];

  const getButtonClasses = (isActive) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-teal-500 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={getButtonClasses(activeFilter === filter.key)}
          aria-pressed={activeFilter === filter.key}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTasks;
