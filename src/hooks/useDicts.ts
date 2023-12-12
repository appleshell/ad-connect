import { create } from "zustand";
import { userTypes } from "@/config/mockData";

const useDicts = create((set) => ({
  userTypes,
}));

export default useDicts;
