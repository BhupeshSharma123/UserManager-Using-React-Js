/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import axios from "axios";

export default function EditPage({
  isModalOpen,
  setModalOpen,
  userId, // User id for the user being edited
  userData, // The data for the user being edited
  setQueryData, // Function to update query data in the parent component
}) {
  // Function to update user data on the server and reflect changes in the UI
  const updateData = async (id, values) => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, values); // Update request to API
      console.log("Updated Data", values);

      // Update the query data in the parent to reflect the changes in the user list
      setQueryData((prevData) =>
        prevData.map((user) => (user.id === id ? { ...user, ...values } : user))
      );
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  // Formik hook for handling form state and submission
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      first_name: userData.first_name || "", // Default to existing value if available
      last_name: userData.last_name || "",
      email: userData.email || "",
    },
    onSubmit: (values) => {
      console.log("Form data submitted:", values);
      updateData(userId, values); // Update the user data
      setModalOpen(false); // Close the modal after submission
    },
  });

  // Function to close the modal if the backdrop is clicked
  const closeModal = (event) => {
    if (event.target.id === "modal-backdrop") {
      setModalOpen(false); // Close the modal
    }
  };

  return (
    isModalOpen && ( // Only render the modal if it's open
      <div
        id="modal-backdrop"
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={closeModal} // Close modal on backdrop click
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
          {/* Close button for the modal */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

          {/* Form for editing user details */}
          <form onSubmit={handleSubmit}>
            {/* First Name Input */}
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={handleChange}
                value={values.first_name} // Bind input value to formik state
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Last Name Input */}
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={handleChange}
                value={values.last_name}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={values.email}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
}
