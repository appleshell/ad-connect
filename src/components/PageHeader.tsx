"use client";

import React, { useContext, useEffect, useMemo } from "react";
import { Layout, Dropdown, Space, Avatar } from "antd";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";

import { getPathByKey, getCurrentUser } from "@/utils/helper";

import { useUserInfo } from "@/hooks";

const { Header } = Layout;

const PageHeader = () => {
  const userInfo = useUserInfo((state: any) => state.userInfo);
  const navigate = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();

  const logout = async () => {
    if (typeof window === "undefined") return;
    try {
      navigate.push("/login");
      window.localStorage.removeItem("AUTH_TOKEN");
      window.localStorage.removeItem("AUTH_USER");
    } catch {}
  };

  const accountInfo = () => {
    navigate.push("/main/user");
  };

  const items = [
    { label: <span onClick={logout}>重新登录</span>, key: "logout" },
    { label: <span onClick={accountInfo}>账户详情</span>, key: "account" },
  ];

  return (
    <div>
      <Header>
        <Dropdown menu={{ items }} className="float-right">
          <Space>
            <Avatar src="/assets/images/avatar.png" />
            <span className="w-full text-[14px] text-white">
              {userInfo.user_name}
            </span>
            <DownOutlined className="text-white" />
          </Space>
        </Dropdown>
      </Header>
    </div>
  );
};

export default PageHeader;
