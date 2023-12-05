import { ReactNode } from "react";
import dayjs from "dayjs";
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

const generateMockData = (len = 7, min = 10, max = 100) => {
  const arr = new Array(len).fill({}).map((item, index) => {
    return {
      time: dayjs().subtract(index, "day").format("YYYY-MM-DD"),
      value: Math.ceil(Math.random() * (max - min)) + min,
    };
  });
  return arr.reverse();
};

export const dataList = (day = 7) => {
  const itemList = [
    { name: "展现数", range: [80, 800] },
    { name: "访问数", range: [500, 1000] },
    { name: "下载数", range: [100, 1000] },
    { name: "收益", range: [100, 2000] },
  ];
  return itemList.map((item) => ({
    name: item.name,
    points: generateMockData(day, item.range[0], item.range[1]),
  }));
};

export const chartDatas = [
  {
    name: "展现数",
    points: generateMockData(10, 80, 800),
  },
  {
    name: "访问数",
    points: generateMockData(10, 500, 1000),
  },
  {
    name: "下载数",
    points: generateMockData(10, 100, 1000),
  },
  {
    name: "收益",
    points: generateMockData(10, 100, 2000),
  },
];
