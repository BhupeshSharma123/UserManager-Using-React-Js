import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import AddUserPage from "./AddUserPage";

export default function Dashboard() {
  const [queryData, setQueryData] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageIndex: 0,
  });

  const columns = React.useMemo(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "first_name",
        header: "First Name",
        accessorKey: "first_name",
      },
      {
        id: "last_name",
        header: "Last Name",
        accessorKey: "last_name",
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
      },
      {
        id: "actions",
        header: "Actions",
      },
    ],
    []
  );

  const { isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("https://reqres.in/api/users?page=2");
      setQueryData(response.data.data);
      return response.data.data;
    },
  });

  const table = useReactTable({
    data: queryData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination, // Dynamically updates pagination state
  });

  if (isLoading)
    return <h1 className="text-center text-xl font-bold">Loading...</h1>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50 hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2 text-gray-700"
                  >
                    {cell.renderValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {"Page " +
          (table.getState().pagination.pageIndex + 1) +
          " of " +
          table.getPageCount()}
      </p>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        prev
      </button>

      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        next
      </button>
      <AddUserPage setQueryData={setQueryData} />
    </div>
  );
}
