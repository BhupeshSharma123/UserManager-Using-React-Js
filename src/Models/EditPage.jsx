/* eslint-disable react/prop-types */
import axios from "axios";
import { useFormik } from "formik";
import EditUserForm from "../UserForm";

export default function EditPage({
  userData,
  setModalOpen,
  setQueryData,
  notify,
}) {
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
      notify("User Edited");
    },
  });

  return (
    <div>
      <EditUserForm
        heading={"Edit users..."}
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
