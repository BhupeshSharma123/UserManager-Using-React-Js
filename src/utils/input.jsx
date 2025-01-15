/* eslint-disable react/prop-types */

export function Input({ inputText, handleFilterAll, placeholder }) {
  return (
    <input
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2
           focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700
            dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      id="filter"
      value={inputText}
      type="text"
      onChange={handleFilterAll} // Pass the function directly
      placeholder={placeholder}
    />
  );
}
export default Input;
