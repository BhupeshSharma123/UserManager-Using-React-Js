/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import EditPage from "./Models/EditPage";
import { useStore } from "./Store/Store";
import { toast } from "react-toastify";
import AddUserPage from "./Models/AddUserModel";
import Table from "./components/Table";
// Import the Table component
// Import the TableRow component

export const notify = (text) => toast(text);

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
  const [sortOrder, setSortOrder] = useState("asc"); // Track sorting order (asc or desc)
  const [isDarkMode, setIsDarkMode] = useState();

  // State for column filters
  const [columnFilters, setColumnFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // State to track which column's filter input is visible
  const [activeFilterColumns, setActiveFilterColumns] = useState({});

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // Add/remove the 'dark' class on the root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Fetch paginated user data
  const fetchPaginatedData = async ({ queryKey }) => {
    const [_, page] = queryKey;

    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=3`
      );
      setTotalPages(response.data.total_pages);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data", error);
      return [];
    }
  };

  // Fetch data using React Query's useQuery hook
  const { isLoading, isError, error } = useQuery(
    ["users", currentPage],
    fetchPaginatedData,
    {
      enabled: currentPage >= 1,
      onSuccess: (data) => setQueryData(data),
      keepPreviousData: true,
    }
  );

  // Handle sorting
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Handle page change (Pagination)
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setQueryData((prevData) => prevData.filter((user) => user.id !== id));
      notify(`User Deleted`);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Open the modal for editing a selected user
  const openEditModal = (userId) => {
    setSelectedUser(userId);
    setModalOpen(true);
  };

  // Close the modal when clicking outside of it
  const closeModal = (event) => {
    if (event.target.id === "modal-backdrop") {
      setModalOpen(false);
    }
  };

  // Manage body scroll behavior when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Handle column filter input change
  const handleFilterChange = (column, value) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  // Toggle the filter input for a specific column
  const toggleFilterColumn = (column) => {
    setActiveFilterColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Filter data based on column filters
  const filteredData = queryData.filter((user) => {
    return (
      user.first_name
        .toLowerCase()
        .includes(columnFilters.first_name.toLowerCase()) &&
      user.last_name
        .toLowerCase()
        .includes(columnFilters.last_name.toLowerCase()) &&
      user.email.toLowerCase().includes(columnFilters.email.toLowerCase())
    );
  });

  // Sort the filteredData array
  const sortedData = [...filteredData].sort((a, b) => {
    if (a.first_name < b.first_name) return sortOrder === "asc" ? -1 : 1;
    if (a.first_name > b.first_name) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (isLoading) {
    return <h1 className="text-center text-xl font-bold">Loading...</h1>;
  }

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
            onClick={handleSort}
            className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
          >
            Sort by First Name ({sortOrder === "asc" ? "↑" : "↓"})
          </button>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>
      </div>

      {/* Table displaying user data */}
      <Table
        activeFilterColumns={activeFilterColumns}
        toggleFilterColumn={toggleFilterColumn}
        columnFilters={columnFilters}
        handleFilterChange={handleFilterChange}
        sortedData={sortedData}
        currentPage={currentPage}
        openEditModal={openEditModal}
        handleDelete={handleDelete}
      />

      {/* Pagination Controls */}
      <div className="bg-transparent mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-white"
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        <p className="dark:text-white">Page {currentPage}</p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
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
          onClick={closeModal}
        >
          <div className="shadow-lg rounded-lg p-8 w-full max-w-md relative backdrop-blur-md bg-white dark:bg-gray-800">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-xl"
            >
              &times;
            </button>
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
