import { useState } from "react";

export default function TableCard() {
  let [element, setElement] = useState("");
  let [addedElements, setAddedElements] = useState([]);
  let [checkedItems, setCheckedItems] = useState([]);
  let [editIndex, setEditIndex] = useState(null);
  let [editText, setEditText] = useState("");

  function addElement(item) {
    localStorage.setItem("addedElements", addedElements);
    setAddedElements([...addedElements, item]);
    setElement("");
  }

  function sortElements() {
    let sortedArray = [...addedElements].sort();
    sortedArray.reverse();
    setAddedElements(sortedArray);
  }

  function handleDelete(index) {
    setAddedElements((prev) => prev.filter((_, i) => i !== index));
  }

  function handleCheckboxChange(item) {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditText(addedElements[index]);
  }

  function saveEdit(index) {
    let updatedElements = [...addedElements];
    updatedElements[index] = editText;
    setAddedElements(updatedElements);
    setEditIndex(null);
    setEditText("");
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Element Manager
      </h1>
      <input
        value={element}
        type="text"
        onChange={(e) => setElement(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter a new element"
      />
      <div className="flex justify-between mb-6">
        <button
          onClick={() => addElement(element)}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 shadow"
        >
          Add
        </button>
        <button
          onClick={sortElements}
          className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 shadow"
        >
          Sort
        </button>
      </div>
      <ul className="space-y-4">
        {addedElements.map((item, index) => (
          <li
            key={index}
            className="p-4 bg-white rounded shadow flex items-center justify-between"
          >
            {editIndex === index ? (
              <input
                value={editText}
                type="text"
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mr-4"
              />
            ) : (
              <p
                className={`text-gray-800 ${
                  checkedItems.includes(item) ? "line-through" : ""
                }`}
              >
                {item}
              </p>
            )}
            <div className="flex items-center gap-2">
              {editIndex === index ? (
                <button
                  onClick={() => saveEdit(index)}
                  className="px-3 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 shadow"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className="px-3 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600 shadow"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 shadow"
              >
                Delete
              </button>
              <input
                type="checkbox"
                value={item}
                checked={checkedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
