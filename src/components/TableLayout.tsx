import React, { FC, ReactNode } from "react";

function formatArr(children: ReactNode[]) {
  let ret: ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    const ele = React.createElement("div", { className: "p-3" }, child);
    ret.push(ele);
    ret.push(React.createElement("div", { className: "h-3 bg-[#f0f2f5]" }));
  });
  ret.pop();
  return ret;
}

const TableLayout: FC<{ children: ReactNode[] }> = ({ children }) => {
  const nodes = formatArr(children);
  return <div className="bg-white">{nodes}</div>;
};

export default TableLayout;
