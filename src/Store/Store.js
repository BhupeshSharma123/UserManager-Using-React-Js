// store.js
import { create } from "zustand";

export const useStore = create((set) => ({
  filterValue: "",
  currentPage: 1,
  queryData: [],
  totalPages: 1,
  isModalOpen: false,
  countAdded: 0,
  total: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setCountAdded: () => set((state) => ({ countAdded: state.countAdded + 1 })),
  setDeleteCountAdded: () => set((state) => ({ total: state.total - 1 })),
  setTotal: (count, data) => set(() => ({ total: data + count })),
  setQueryData: (data) => set({ queryData: data }),
  setTotalPages: (total) => set({ totalPages: total }),
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setFilterValue: (value) => set({ filterValue: value }), // directly setting the filter value
}));
