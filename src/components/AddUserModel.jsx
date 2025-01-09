/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import axios from "axios";
import { useStore } from "../Store";
import { toast } from "react-toastify";

export default function AddUserPage({ setQueryData, notify }) {
  const { setCurrentPage, setModalOpen, currentPage } = useStore();

  const addData = async (userData) => {
    try {
      const res = await axios.post("https://reqres.in/api/users/", userData);
      return res.data;
    } catch (error) {
      console.error("Error adding user data", error);
      toast.error("Failed to add user. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "bg-red-500 text-white", // Tailwind CSS classes for styling
      });
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
          const updatedData = [...prevQueryData];
          updatedData.unshift(newUser);

          if (updatedData.length > 3) {
            if (currentPage === 1) {
              return updatedData.slice(0, 3);
            }

            if (currentPage > 1) {
              const totalPages = Math.ceil(updatedData.length / 3);
              setCurrentPage(Math.min(currentPage, totalPages));
              return updatedData.slice((currentPage - 1) * 3, currentPage * 3);
            }
          }

          return updatedData;
        });

        // Trigger the toast notification
        setModalOpen(false); // Close the modal after successful form submission
      }
      notify("User added");
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
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
