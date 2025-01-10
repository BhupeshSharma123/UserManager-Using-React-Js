/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import EditPage from "../Models/EditPage";
import { useStore } from "../Store/Store";
import { toast } from "react-toastify";
import AddUserPage from "../Models/AddUserModel";

export default function Dashboard() {
  // Destructuring state from the global store
  const notify = (text) => toast(text);
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
  const [filterQuery, setFilterQuery] = useState(""); // Filter query for searching users
  const [sortOrder, setSortOrder] = useState("asc"); // Track sorting order (asc or desc)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" // Initialize with user's preference
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Save preference to localStorage
      return newMode;
    });
  };

  // Effect to add/remove the 'dark' class on the root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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

  // Handle sorting
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc")); // Toggle sorting order
  };

  // Handle page change (Pagination)
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Don't allow invalid pages
    setCurrentPage(page); // Update the current page in the store
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`); // Send delete request

      // Remove the deleted user from the queryData array
      setQueryData((prevData) => prevData.filter((user) => user.id !== id));

      console.log("User deleted with ID:", id);
      notify(`User Deleted`); // Notify the user
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

  // Filter users based on the filter query
  const filteredData = queryData.filter((user) => {
    return (
      user.first_name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(filterQuery.toLowerCase())
    );
  });

  // Sort the filteredData array
  const sortedData = [...filteredData].sort((a, b) => {
    if (a.first_name < b.first_name) return sortOrder === "asc" ? -1 : 1;
    if (a.first_name > b.first_name) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (isLoading) {
    // Display loading message while data is being fetched
    return <h1 className="text-center text-xl font-bold">Loading...</h1>;
  }

  // Display error message if an error occurred while fetching data
  if (isError) {
    return (
      <h1 className="text-center text-xl font-bold">Error: {error.message}</h1>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleSort} // Toggle sorting order
            className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
          >
            Sort by First Name ({sortOrder === "asc" ? "↑" : "↓"})
          </button>
          <button
            onClick={toggleDarkMode} // Toggle dark mode
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={() => setModalOpen(true)} // Open modal on click
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>
      </div>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)} // Update filter query on input change
          className="px-4 py-2 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Table displaying user data */}
      <div className="overflow-x-auto max-h-60">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              {/* Table headers */}
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
                First Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
                Last Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="h-full">
            {Array.isArray(sortedData) &&
              sortedData.map((user, index) => (
                <tr
                  key={user.id}
                  className="even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
                    {currentPage * 3 - 3 + index + 1}{" "}
                    {/* Calculate ID based on current page */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
                    {user.first_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
                    {user.last_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 dark:text-white">
                    <div className="content-center">
                      {/* Edit and Delete buttons */}
                      {!user.delete && (
                        <>
                          <button
                            className="hover:bg-green-700 border align-middle mx-2 px-2 py-1 border-black rounded-lg bg-green-600 text-slate-50"
                            onClick={() => openEditModal(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="align-middle hover:bg-red-600 border mx-2 px-4 py-1 border-black rounded-lg bg-red-500 text-slate-50"
                            onClick={() => handleDelete(user.id)} // Delete user on click
                          >
                            Delete
                          </button>
                        </>
                      )}
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
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-white"
          disabled={currentPage <= 1} // Disable if on the first page
        >
          Prev
        </button>
        <p className="dark:text-white">Page {currentPage}</p>
        <button
          onClick={() => handlePageChange(currentPage + 1)} // Next page button
          disabled={currentPage >= totalPages} // Disable if on the last page
          className="px-4 py-2 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
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
          <div className="shadow-lg rounded-lg p-8 w-full max-w-md relative backdrop-blur-md bg-white dark:bg-gray-800">
            <button
              onClick={() => setModalOpen(false)} // Close modal
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-xl"
            >
              &times;
            </button>
            {/* Conditionally render Edit or Add User Modal */}
            {selectedUser ? (
              <EditPage
                notify={notify}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
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
