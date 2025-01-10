/* eslint-disable react/prop-types */
export const FilterableHeader = ({
  columnKey,
  columnName,
  activeFilterColumns,
  columnFilters,
  handleFilterChange,
  toggleFilterColumn,
}) => (
  <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
    <div className="flex items-center justify-between">
      <span>{columnName}</span>
      <button
        onClick={() => toggleFilterColumn(columnKey)}
        className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
      >
        Filter
      </button>
    </div>
    {activeFilterColumns[columnKey] && (
      <input
        type="text"
        placeholder={`Filter ${columnName}`}
        value={columnFilters[columnKey]}
        onChange={(e) => handleFilterChange(columnKey, e.target.value)}
        className="mt-2 px-2 py-1 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    )}
  </th>
);

export const TableHeader = ({
  activeFilterColumns,
  columnFilters,
  handleFilterChange,
  toggleFilterColumn,
}) => {
  return (
    <>
      <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
        ID
      </th>
      <FilterableHeader
        columnKey="first_name"
        columnName="First Name"
        activeFilterColumns={activeFilterColumns}
        columnFilters={columnFilters}
        handleFilterChange={handleFilterChange}
        toggleFilterColumn={toggleFilterColumn}
      />
      <FilterableHeader
        columnKey="last_name"
        columnName="Last Name"
        activeFilterColumns={activeFilterColumns}
        columnFilters={columnFilters}
        handleFilterChange={handleFilterChange}
        toggleFilterColumn={toggleFilterColumn}
      />
      <FilterableHeader
        columnKey="email"
        columnName="Email"
        activeFilterColumns={activeFilterColumns}
        columnFilters={columnFilters}
        handleFilterChange={handleFilterChange}
        toggleFilterColumn={toggleFilterColumn}
      />
      <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
        Actions
      </th>
    </>
  );
};

// Usage Example
// <TableHeader
//   activeFilterColumns={activeFilterColumns}
//   columnFilters={columnFilters}
//   handleFilterChange={handleFilterChange}
//   toggleFilterColumn={toggleFilterColumn}
// />
