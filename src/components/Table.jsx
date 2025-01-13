/* eslint-disable react/prop-types */
// Table.js

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export const Table = ({
  activeFilterColumns,
  toggleFilterColumn,
  columnFilters,
  handleFilterChange,
  sortedData,
  currentPage,
  openEditModal,
  handleDelete,
}) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          {!activeFilterColumns.first_name &&
            !activeFilterColumns.last_name &&
            !activeFilterColumns.email && (
              <>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
                  ID
                </th>
                <TableHeader
                  column="first_name"
                  label="First Name"
                  toggleFilterColumn={toggleFilterColumn}
                  activeFilterColumns={activeFilterColumns}
                  columnFilters={columnFilters}
                  handleFilterChange={handleFilterChange}
                />
                <TableHeader
                  column="last_name"
                  label="Last Name"
                  toggleFilterColumn={toggleFilterColumn}
                  activeFilterColumns={activeFilterColumns}
                  columnFilters={columnFilters}
                  handleFilterChange={handleFilterChange}
                />
                <TableHeader
                  column="email"
                  label="Email"
                  toggleFilterColumn={toggleFilterColumn}
                  activeFilterColumns={activeFilterColumns}
                  columnFilters={columnFilters}
                  handleFilterChange={handleFilterChange}
                />
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
                  Actions
                </th>
              </>
            )}
          {activeFilterColumns.first_name && (
            <TableHeader
              column="first_name"
              label="First Name"
              toggleFilterColumn={toggleFilterColumn}
              activeFilterColumns={activeFilterColumns}
              columnFilters={columnFilters}
              handleFilterChange={handleFilterChange}
            />
          )}
          {activeFilterColumns.last_name && (
            <TableHeader
              column="last_name"
              label="Last Name"
              toggleFilterColumn={toggleFilterColumn}
              activeFilterColumns={activeFilterColumns}
              columnFilters={columnFilters}
              handleFilterChange={handleFilterChange}
            />
          )}
          {activeFilterColumns.email && (
            <TableHeader
              column="email"
              label="Email"
              toggleFilterColumn={toggleFilterColumn}
              activeFilterColumns={activeFilterColumns}
              columnFilters={columnFilters}
              handleFilterChange={handleFilterChange}
            />
          )}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(sortedData) &&
          sortedData.map((user, index) => (
            <TableRow
              key={user.id}
              user={user}
              index={index}
              currentPage={currentPage}
              activeFilterColumns={activeFilterColumns}
              openEditModal={openEditModal}
              handleDelete={handleDelete}
            />
          ))}
      </tbody>
    </table>
  );
};
export default Table;
