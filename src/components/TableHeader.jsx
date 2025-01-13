/* eslint-disable react/prop-types */
// TableHeader.js

export const TableHeader = ({
  column,
  label,
  toggleFilterColumn,
  activeFilterColumns,
  columnFilters,
  handleFilterChange,
}) => {
  return (
    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <button
          onClick={() => toggleFilterColumn(column)}
          className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          Filter
        </button>
      </div>
      {activeFilterColumns[column] && (
        <input
          type="text"
          placeholder={`Filter ${label}`}
          value={columnFilters[column]}
          onChange={(e) => handleFilterChange(column, e.target.value)}
          className="mt-2 px-2 py-1 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      )}
    </th>
  );
};

export default TableHeader;
