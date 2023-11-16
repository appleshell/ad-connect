"use client";

import { Suspense, useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import { PageHeader, PageSider } from "@/components";
import WrapperContext, { IMeun } from "./wrapperContext";

const { Content, Footer } = Layout;

const apiMenuList = [
  {
    key: "/main/api-pages/dashboard",
    label: "dashboard",
  },
  {
    key: "/main/api-pages/traffic",
    label: "流量",
  },
  {
    key: "/main/api-pages/connect-test",
    label: "api调试",
  },
  {
    key: "/main/user",
    label: "账户详情",
  },
];

const sdkMenuList = [
  {
    key: "/main/sdk-pages/download",
    label: "sdk下载",
  },
  {
    key: "/main/user",
    label: "账户详情",
  },
];

const MainPage = ({ children }: any) => {
  const [menus, setMenus] = useState<Array<IMeun>>([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getInitInfo();
  }, []);

  const getInitInfo = async () => {
    try {
      if (typeof window !== "undefined") {
        const userCode = window.localStorage.getItem("AUTH_USER"); // 用于查询用户信息和对应的菜单数据
        const res = await Promise.resolve({
          userInfo: { userId: 123, user_name: "zhansan" },
          menus: userCode === "1" ? apiMenuList : sdkMenuList,
        });
        const { userInfo, menus } = res;

        setMenus(menus);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WrapperContext.Provider value={{ menus, userInfo }}>
      <Layout className="w-full h-screen">
        <PageSider />
        <Layout>
          <PageHeader />
          <Content className="w-full p-3 overflow-auto">
            <Suspense fallback={<Spin spinning={true} />}>
              <section className="w-full h-full bg-white">{children}</section>
            </Suspense>
          </Content>
          <Footer className="text-center bg-white px-1 py-6 border-solid border-t border-l border-[#f0f2f5]">
            Copyright 2015-{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </WrapperContext.Provider>
  );
  return;
};

export default MainPage;
