import { createContext } from "react";

export interface IMeun {
  label: string;
  key: string;
  icon?: string | null;
}

const WrapperContext = createContext<{
  menus: IMeun[];
  userInfo: any;
}>({
  menus: [],
  userInfo: {},
});

export default WrapperContext;
