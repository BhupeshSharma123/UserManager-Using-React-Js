/* eslint-disable react/prop-types */
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({
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
          {/* Always render the ID column */}
          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
            ID
          </th>

          {/* Render all columns with filter inputs conditionally */}
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

          {/* Always render the Actions column */}
          <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
            Actions
          </th>
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
