import { Input } from "./utils/input";
/* eslint-disable no-unused-vars */
// Dashboard.js
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import EditPage from "../src/Models/EditPage";
import { useStore } from "../src/Store/Store";
import AddUserPage from "../src/Models/AddUserModel";
import Table from "../src/components/Table";
import {
  notify,
  fetchPaginatedData,
  handleDelete,
  handleFilterChange,
  toggleFilterColumn,
  sortData,
  filterData,
  toggleDarkMode,
  closeModal,
  manageBodyScroll,
  filterAll,
  resetFilters,
} from "../src/utils/DashboardFunctions"; // Import functions

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
  const [inputText, setInputText] = useState("");

  // State for column filters
  const [columnFilters, setColumnFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // State to track which column's filter input is visible
  const [activeFilterColumns, setActiveFilterColumns] = useState({});

  // Add/remove the 'dark' class on the root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Fetch data using React Query's useQuery hook
  const { isLoading, isError, error } = useQuery(
    ["users", currentPage],
    (queryKey) => fetchPaginatedData(queryKey, setTotalPages),
    {
      enabled: currentPage >= 1,
      onSuccess: (data) => setQueryData(data),
      keepPreviousData: true,
    }
  );
  const handleFilterAll = filterAll(setInputText, setColumnFilters);
  const handleResetFilters = () => {
    setInputText("");
    setColumnFilters(resetFilters(columnFilters));
    setActiveFilterColumns({});
  };
  // Handle sorting
  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const resetFilters = () => {
    setColumnFilters({
      first_name: "",
      last_name: "",
      email: "",
    });
    setInputText("");
    console.log("reset button clicked");
  };

  // Handle page change (Pagination)
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Open the modal for editing a selected user
  const openEditModal = (userId) => {
    setSelectedUser(userId);
    setModalOpen(true);
  };

  // Filter and sort data
  const filteredData = filterData(queryData, columnFilters);
  const sortedData = sortData(filteredData, sortOrder);

  if (isLoading) {
    return <h1 className="text-center text-xl font-bold">Loading...</h1>;
  }

  if (isError) {
    return (
      <h1 className="text-center text-xl font-bold">Error: {error.message}</h1>
    );
  }
  console.log(inputText);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
        <Input
          inputText={inputText}
          handleFilterAll={handleFilterAll}
          placeholder={"Filter..."}
        />

        <div className="flex gap-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset Filters
          </button>
          <button
            onClick={handleSort}
            className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
          >
            Sort by First Name ({sortOrder === "asc" ? "↑" : "↓"})
          </button>
          <button
            onClick={() => toggleDarkMode(isDarkMode, setIsDarkMode)}
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
        toggleFilterColumn={(column) =>
          toggleFilterColumn(column, setActiveFilterColumns)
        }
        columnFilters={columnFilters}
        handleFilterChange={(column, value) =>
          handleFilterChange(column, value, setColumnFilters)
        }
        sortedData={sortedData}
        currentPage={currentPage}
        openEditModal={openEditModal}
        handleDelete={(id) => handleDelete(id, setQueryData)}
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
          onClick={(event) => closeModal(event, setModalOpen)}
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
