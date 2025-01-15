/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";

export const notify = (text) => toast(text);

// Fetch paginated user data
export const fetchPaginatedData = async (
  { queryKey },
  setTotalPages,
  total
) => {
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

// Handle user deletion
export const handleDelete = async (id, setQueryData) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    setQueryData((prevData) => prevData.filter((user) => user.id !== id));
    notify(`User Deleted`);
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

// Handle column filter input change
export const handleFilterChange = (column, value, setColumnFilters) => {
  setColumnFilters((prevFilters) => ({
    ...prevFilters,
    [column]: value,
  }));
};

// Toggle the filter input for a specific column
export const toggleFilterColumn = (column, setActiveFilterColumns) => {
  setActiveFilterColumns((prev) => ({
    ...prev,
    [column]: !prev[column],
  }));
};

// Sort the filteredData array
export const sortData = (filteredData, sortOrder) => {
  return [...filteredData].sort((a, b) => {
    if (a.first_name < b.first_name) return sortOrder === "asc" ? -1 : 1;
    if (a.first_name > b.first_name) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};

// Filter data based on column filters
export const filterData = (queryData, columnFilters) => {
  if (!Array.isArray(queryData)) {
    console.error("queryData is not an array");
    return [];
  }

  return queryData.filter((user) => {
    // Check if any column filter matches the user data
    return (
      (columnFilters.first_name === "" ||
        user.first_name
          .toLowerCase()
          .includes(columnFilters.first_name.toLowerCase())) &&
      (columnFilters.last_name === "" ||
        user.last_name
          .toLowerCase()
          .includes(columnFilters.last_name.toLowerCase())) &&
      (columnFilters.email === "" ||
        user.email.toLowerCase().includes(columnFilters.email.toLowerCase()))
    );
  });
};

// Toggle dark mode
export const toggleDarkMode = (isDarkMode, setIsDarkMode) => {
  setIsDarkMode((prevMode) => {
    const newMode = !prevMode;
    localStorage.setItem("darkMode", newMode);
    return newMode;
  });
};

// Close the modal when clicking outside of it
export const closeModal = (event, setModalOpen) => {
  if (event.target.id === "modal-backdrop") {
    setModalOpen(false);
  }
};

// Manage body scroll behavior when modal is open
export const manageBodyScroll = (isModalOpen) => {
  document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  return () => {
    document.body.style.overflow = "auto";
  };
};

// Apply a global filter to all columns
export function filterAll(setInputText, setColumnFilters) {
  return (e) => {
    const inputValue = e.target.value; // Get the input value
    setInputText(inputValue); // Update the input text state

    // Apply the same filter value to all columns
    setColumnFilters({
      first_name: inputValue,
      last_name: inputValue,
      email: inputValue,
    });
  };
}
export const resetFilters = () => {
  setColumnFilters({
    first_name: "",
    last_name: "",
    email: "",
  });
  setInputText("");
  console.log("reset button clicked");
};
