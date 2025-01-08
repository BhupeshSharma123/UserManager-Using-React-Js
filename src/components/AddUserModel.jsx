/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import axios from "axios";
import { useStore } from "../Store";

export default function AddUserPage({ setQueryData }) {
  const { setCurrentPage, setModalOpen, currentPage } = useStore();

  // Function to add user data
  const addData = async (userData) => {
    try {
      const res = await axios.post("https://reqres.in/api/users/", userData);
      return res.data;
    } catch (error) {
      console.error("Error adding user data", error);
    }
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },

    onSubmit: async (values) => {
      const newUser = await addData(values); // Add the new user
      if (newUser) {
        setQueryData((prevQueryData) => {
          // Create a copy of the previous queryData and add the new user at the front
          const updatedData = [...prevQueryData]; // Create a shallow copy of the array
          updatedData.unshift(newUser); // Add new user at the beginning

          // Check if the total number of users exceeds 3 and adjust pagination
          if (updatedData.length > 3) {
            // Ensure the current page is set to 1 (for page 1 users)
            if (currentPage === 1) {
              return updatedData.slice(0, 3); // Only show first 3 users
            }

            // If currentPage is 2 or higher, ensure it adjusts to the new data
            if (currentPage > 1) {
              // Check if we need to adjust the page due to deletion
              const totalPages = Math.ceil(updatedData.length / 3);
              setCurrentPage(Math.min(currentPage, totalPages)); // Set page within the available range

              return updatedData.slice((currentPage - 1) * 3, currentPage * 3); // Return users for the current page
            }
          }

          return updatedData;
        });

        // Close the modal after successful form submission
        setModalOpen(false);
      }
    },
  });

  return (
    <div>
      Add User
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-lg backdrop-blur-md"
      >
        <div>
          <label htmlFor="first_name" className="block font-medium">
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            onChange={handleChange}
            value={values.first_name}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block font-medium">
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            onChange={handleChange}
            value={values.last_name}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
