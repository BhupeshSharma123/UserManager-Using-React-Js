/* eslint-disable react/prop-types */
import axios from "axios";
import { useFormik } from "formik";

export default function EditPage({ userData, setModalOpen, setQueryData }) {
  const updateData = async (id, values) => {
    try {
      const res = await axios.put(`https://reqres.in/api/users/${id}`, values);
      console.log("Post Data", res.data);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
    },
    onSubmit: (values) => {
      console.log("Form data submitted:", values);
      updateData(userData.id, values);
      // Pass the id and updated values
      console.log(userData.id);
      setQueryData((prevData) =>
        prevData.map((user) =>
          user.id === userData.id ? { ...user, ...values } : user
        )
      );
      setModalOpen(false);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

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
            value={values.first_name}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
