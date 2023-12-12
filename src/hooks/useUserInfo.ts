import { create } from "zustand";

const useUserInfo = create((set) => ({
  userInfo: {},
  updateUserInfo: (info = {}) => {
    return set((state: any) => ({ userInfo: { ...state.userInfo, ...info } }));
  },
}));

export default useUserInfo;
