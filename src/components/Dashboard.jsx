/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AddUserPage from "./AddUserModel";
import EditPage from "./EditPage"; // Assuming you have an EditPage component
import { useStore } from "../Store";

export default function Dashboard() {
  // Destructuring state from the global store
  const {
    currentPage,
    isModalOpen,
    totalPages,
    setCurrentPage,
    setTotalPages,
    setModalOpen,
  } = useStore();

  const [queryData, setQueryData] = useState([]); // Stores the users data
  const [selectedUser, setSelectedUser] = useState(null); // Tracks the selected user for editing

  // Fetch paginated user data
  const fetchPaginatedData = async ({ queryKey }) => {
    const [_, page] = queryKey; // Extract the current page from queryKey

    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=3`
      );
      setTotalPages(response.data.total_pages); // Update the total pages from the response
      return response.data.data; // Return the list of users
    } catch (error) {
      console.error("Error fetching data", error);
      return []; // Return empty array on error
    }
  };

  // Fetch data using React Query's useQuery hook
  const { isLoading, isError, error } = useQuery(
    ["users", currentPage], // Key for this query
    fetchPaginatedData, // Fetch function
    {
      enabled: currentPage >= 1, // Only run query when currentPage is >= 1
      onSuccess: (data) => setQueryData(data), // Set query data after successful fetch
      keepPreviousData: true, // Keep previous data while new data is loading
    }
  );

  // Handle page change (Pagination)
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Don't allow invalid pages
    setCurrentPage(page); // Update the current page in the store
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`); // Send delete request
      setQueryData(queryData.filter((user) => user.id !== id)); // Remove deleted user from local state
      console.log("User deleted with ID:", id);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Open the modal for editing a selected user
  const openEditModal = (userId) => {
    setSelectedUser(userId); // Set the selected user to edit
    setModalOpen(true); // Open the modal
    console.log(selectedUser, "selected user"); // Debugging
  };

  // Close the modal when clicking outside of it
  const closeModal = (event) => {
    if (event.target.id === "modal-backdrop") {
      setModalOpen(false); // Close the modal
    }
  };

  // Manage body scroll behavior when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto"; // Prevent background scroll when modal is open

    return () => {
      document.body.style.overflow = "auto"; // Reset scroll behavior on cleanup
    };
  }, [isModalOpen]);

  // Display loading message while data is being fetched
  if (isLoading) {
    return <h1 className="text-center text-xl font-bold">Loading...</h1>;
  }

  // Display error message if an error occurred while fetching data
  if (isError) {
    return (
      <h1 className="text-center text-xl font-bold">Error: {error.message}</h1>
    );
  }

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => setModalOpen(true)} // Open modal on click
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
      </div>

      {/* Table displaying user data */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200">
              {/* Table headers */}
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                First Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                Last Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(queryData) &&
              queryData.map((user, index) => (
                <tr key={user.id} className="even:bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {currentPage * 3 - 3 + index + 1}{" "}
                    {/* Calculate ID based on current page */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {user.first_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {user.last_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    <div className="content-center">
                      {/* Edit and Delete buttons */}
                      <button
                        className="border align-middle px-2 py-2 border-black rounded-lg bg-green-600 text-slate-50"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="align-middle border px-4 py-2 border-black rounded-lg bg-red-500 text-slate-50"
                        onClick={() => handleDelete(user.id)} // Delete user on click
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="bg-transparent mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)} // Previous page button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage <= 1} // Disable if on the first page
        >
          Prev
        </button>
        <p>Page {currentPage}</p>
        <button
          onClick={() => handlePageChange(currentPage + 1)} // Next page button
          disabled={currentPage >= totalPages} // Disable if on the last page
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* Modal for Add/Edit User */}
      {isModalOpen && (
        <div
          id="modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div className="shadow-lg rounded-lg p-8 w-full max-w-md relative backdrop-blur-md">
            <button
              onClick={() => setModalOpen(false)} // Close modal
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            {/* Conditionally render Edit or Add User Modal */}
            {selectedUser ? (
              <EditPage
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
                userId={selectedUser.id}
                userData={selectedUser}
                setQueryData={setQueryData}
              />
            ) : (
              <AddUserPage queryData={queryData} setQueryData={setQueryData} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
