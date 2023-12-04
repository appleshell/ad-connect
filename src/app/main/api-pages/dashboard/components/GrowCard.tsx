import React from "react";
import { growCardList } from "../data";
import { Card, Tag, Statistic } from "antd";
import Icon, { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { ClockSvg, FootSvg } from "./Icons";

const GrowCard = () => {
  return (
    <div className="flex">
      {growCardList.map((item, index) => {
        return (
          <Card
            key={index}
            size="small"
            title={item.title}
            className="w-1/4 mx-1"
            extra={<Tag color={item.color}>{item.action}</Tag>}
          >
            {/* <Statistic
              // title="Active"
              value={item.value}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              // suffix="%"
            /> */}
            <div className="flex p-4 justify-between items-center">
              <span className="p-0 text-3xl">{item.value}</span>
              {/* <ArrowUpOutlined /> */}
              <Icon component={item.icon} style={{ width: 40 }} />
            </div>
            <div className="flex p-2 px-4 justify-between items-center">
              <span>{`总${item.title}`}</span>
              <span className="p-0">{item.total}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default GrowCard;
