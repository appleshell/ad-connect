import { ReactNode } from "react";
import { ClockSvg, FootSvg, CardSvg, MoneySvg } from "./components/Icons";

export interface GrowCardItem {
  icon: any;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: "展现数",
    icon: ClockSvg,
    value: 2000,
    total: 120000,
    color: "green",
    action: "月",
  },
  {
    title: "访问数",
    icon: FootSvg,
    value: 20000,
    total: 500000,
    color: "blue",
    action: "月",
  },
  {
    title: "下载数",
    icon: CardSvg,
    value: 8000,
    total: 120000,
    color: "orange",
    action: "周",
  },
  {
    title: "收益(元)",
    icon: MoneySvg,
    value: 5000,
    total: 50000,
    color: "purple",
    action: "年",
  },
];
