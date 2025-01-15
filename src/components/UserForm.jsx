/* eslint-disable react/prop-types */

export const EditUserForm = ({
  heading,
  values,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 dark:text-white">{heading}</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-md"
      >
        <div>
          <label
            htmlFor="first_name"
            className="block font-medium dark:text-white"
          >
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            onChange={handleChange}
            value={values.first_name}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block font-medium dark:text-white"
          >
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            onChange={handleChange}
            value={values.last_name}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium dark:text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
