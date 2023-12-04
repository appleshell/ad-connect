"use client";

import React, { useState } from "react";
import axios from "axios";
import { DatePicker, Space, Switch } from "antd";
import TableCom from "@/components/TableCom";
import { BASE_URL } from "@/config/http";
import qs from "qs";
import dayjs from "dayjs";
// import { userTypeMap } from "../user/page";

const userTypeMap: any = {
  1: "使用API",
  2: "使用SDK",
};

const { RangePicker } = DatePicker;

const userStatusMap: any = {
  0: "失效",
  1: "有效",
};

const UserLists = () => {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);

  const itemList = [
    { name: "user_name", label: "用户名称" },
    { name: "email", label: "注册邮箱" },
    // { name: "created_at", label: "创建日期", render: () => <RangePicker /> },
  ];

  const columns = [
    { title: "用户名称", dataIndex: "user_name" },
    { title: "邮箱", dataIndex: "email" },
    {
      title: "用户类型",
      dataIndex: "type",
      render: (v: string) => userTypeMap[v],
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      render: (v: Date) => dayjs(v).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "账号状态",
      dataIndex: "status",
      render: (v: string) => userStatusMap[v],
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: (_: never, { status, type }: any) => (
        <Space>
          <Switch
            disabled={type !== 0}
            checked={status === 1}
            checkedChildren="生效"
            unCheckedChildren="失效"
          />
        </Space>
      ),
    },
  ];

  const queryDataList = async (params: any, pageData: any) => {
    const { current, pageSize } = pageData;
    const { created_at, ...restParams } = params;
    if (created_at?.length) {
      params = {
        ...restParams,
        created_start: dayjs(created_at[0]).valueOf(),
        created_end: dayjs(created_at[1]).valueOf(),
      };
    }
    const strs = qs.stringify({ ...params, current, page_size: pageSize });
    console.log(strs);

    if (typeof window !== "undefined") {
      const accessToken = window.localStorage.getItem("AUTH_TOKEN");
      try {
        const { status, data } = await axios.get(`${BASE_URL}/user?${strs}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (status === 200) {
          setDataSource(data || []);
        }
      } catch (error) {}
    }
  };

  return (
    <TableCom
      tableSearchProps={{ items: itemList }}
      tableProps={{
        columns,
        dataSource,
        queryData: queryDataList,
        pagination: { total },
      }}
    />
  );
};

export default UserLists;
