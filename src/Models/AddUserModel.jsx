/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import axios from "axios";
import { useStore } from "../Store/Store";
import { toast } from "react-toastify";

import EditUserForm from "../components/UserForm";

export default function AddUserPage({ setQueryData, notify }) {
  const { setCurrentPage, setModalOpen, currentPage, setCountAdded } =
    useStore();

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
      setCountAdded();

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
        notify("User added");
      }
    },
  });

  return (
    <div>
      <EditUserForm
        heading={"Add users..."}
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
