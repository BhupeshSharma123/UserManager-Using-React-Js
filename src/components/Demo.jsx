import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Fetch data from the API
const fetchUsers = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://reqres.in/api/users?page=${pageParam}&per_page=2`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function InfiniteScrollExample() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => {
      // Determine if there is a next page
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined; // No more pages
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.data.map((user) => (
              <li key={user.id}>
                {user.first_name} {user.last_name}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
}

export default InfiniteScrollExample;
