"use client";

import React, { useContext, useEffect, useMemo } from "react";
import { Layout, Dropdown, Space, Avatar } from "antd";
import Image from "next/image";
// import { useLocation, useNavigate } from 'react-router-dom';
import { useRouter, usePathname } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";
// import { Helpers } from "src/utils";
import { getPathByKey, getCurrentUser } from "@/utils/helper";
import WrapperContext from "@/app/main/wrapperContext";

// import avatar from "/assets/images/avatar.png";
// import { menuRoutes } from "src/routes";
// import { Logout } from "src/service/common/auth";
// import "./style.scss";

const { Header } = Layout;

const PageHeader = () => {
  const { userInfo } = useContext(WrapperContext);
  const navigate = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();

  //   const activeRoute = useMemo(() => {
  //     const pathList = getPathByKey(pathname, menuRoutes);
  //     return pathList[pathList.length - 1];
  //   }, [pathname]);

  const logout = async () => {
    if (typeof window === "undefined") return;
    try {
      const headers = {
        accesstoken: window.localStorage.getItem("token"),
      };
      const header = {
        headers,
        withCredentials: true,
      };
      // const res = await Logout(header, this);
      navigate.push("/login");
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
            {/* <Image src={avatar} width={24} height={24} alt="avatar" /> */}
            <Avatar src="/assets/images/avatar.png" />
            <span className="w-full text-[14px] text-white">
              {userInfo.user_name}
            </span>
            <DownOutlined className="text-white" />
          </Space>
        </Dropdown>
      </Header>
      {/* <div className="route-header">{activeRoute?.label}</div> */}
    </div>
  );
};

export default PageHeader;
