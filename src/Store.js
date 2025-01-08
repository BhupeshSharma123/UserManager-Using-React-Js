// store.js
import { create } from "zustand";

export const useStore = create((set) => ({
  currentPage: 1,
  queryData: [],
  totalPages: 1,
  isModalOpen: false,

  setCurrentPage: (page) => set({ currentPage: page }),
  setQueryData: (data) => set({ queryData: data }),
  setTotalPages: (total) => set({ totalPages: total }),
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));
