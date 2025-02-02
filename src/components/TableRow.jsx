/* eslint-disable react/prop-types */

const TableRow = ({
  user,
  index,
  currentPage,
  openEditModal,
  handleDelete,
}) => {
  return (
    <tr
      key={user.id}
      className="even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-700 dark:hover:bg-gray-600"
    >
      {/* Always render the ID column */}
      <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
        {currentPage * 3 - 3 + index + 1}
      </td>

      {/* Always render the First Name column */}
      <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
        {user.first_name}
      </td>

      {/* Always render the Last Name column */}
      <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
        {user.last_name}
      </td>

      {/* Always render the Email column */}
      <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
        {user.email}
      </td>

      {/* Always render the Actions column */}
      <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
        <div className="content-center">
          <button
            className="hover:bg-green-700 border align-middle mx-2 px-2 py-1 border-black rounded-lg bg-green-600 text-slate-50"
            onClick={() => openEditModal(user)}
          >
            Edit
          </button>
          <button
            className="align-middle hover:bg-red-600 border mx-2 px-4 py-1 border-black rounded-lg bg-red-500 text-slate-50"
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
