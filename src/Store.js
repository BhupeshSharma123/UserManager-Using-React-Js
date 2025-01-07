// counterStore.js

import { create } from "zustand";

// Create the Zustand store
export const useQueryStore = create((set) => ({
  queryData: [""],
  setQueryData: (queryData) => set({ queryData }),
}));
