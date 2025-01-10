//  <tr className="bg-gray-200 dark:bg-gray-700">
//               {/* ID Column */}
//               <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
//                 ID
//               </th>

//               {/* First Name Column with Filter */}

//               <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
//                 <div className="flex items-center justify-between">
//                   <span>First Name</span>
//                   <button
//                     onClick={() => toggleFilterColumn("first_name")}
//                     className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
//                   >
//                     Filter
//                   </button>
//                 </div>
//                 {/* Filter Input for First Name */}
//                 {activeFilterColumns.first_name && (
//                   <input
//                     type="text"
//                     placeholder="Filter First Name"
//                     value={columnFilters.first_name}
//                     onChange={(e) =>
//                       handleFilterChange("first_name", e.target.value)
//                     }
//                     className="mt-2 px-2 py-1 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                   />
//                 )}
//               </th>

//               {/* Last Name Column with Filter */}
//               <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
//                 <div className="flex items-center justify-between">
//                   <span>Last Name</span>
//                   <button
//                     onClick={() => toggleFilterColumn("last_name")}
//                     className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
//                   >
//                     Filter
//                   </button>
//                 </div>
//                 {/* Filter Input for Last Name */}
//                 {activeFilterColumns.last_name && (
//                   <input
//                     type="text"
//                     placeholder="Filter Last Name"
//                     value={columnFilters.last_name}
//                     onChange={(e) =>
//                       handleFilterChange("last_name", e.target.value)
//                     }
//                     className="mt-2 px-2 py-1 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                   />
//                 )}
//               </th>

//               {/* Email Column with Filter */}
//               <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
//                 <div className="flex items-center justify-between">
//                   <span>Email</span>
//                   <button
//                     onClick={() => toggleFilterColumn("email")}
//                     className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
//                   >
//                     Filter
//                   </button>
//                 </div>
//                 {/* Filter Input for Email */}
//                 {activeFilterColumns.email && (
//                   <input
//                     type="text"
//                     placeholder="Filter Email"
//                     value={columnFilters.email}
//                     onChange={(e) =>
//                       handleFilterChange("email", e.target.value)
//                     }
//                     className="mt-2 px-2 py-1 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                   />
//                 )}
//               </th>

//               {/* Actions Column */}
//               <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700 dark:text-white">
//                 Actions
//               </th>
//             </tr>
