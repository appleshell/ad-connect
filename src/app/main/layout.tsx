"use client";

import { Suspense, useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import { useRouter } from "next/navigation";
import { PageHeader, PageSider } from "@/components";
import WrapperContext, { IMeun } from "./wrapperContext";
import { useUserInfo } from "@/hooks";
import request from "@/utils/request";

const { Content, Footer } = Layout;

const commonMenuList = [
  {
    key: "/main/api-pages/dashboard",
    label: "Dashboard",
  },
  {
    key: "/main/accounts",
    label: "用户数据",
  },
  {
    key: "/main/user",
    label: "账户详情",
  },
];

const apiMenuList = [
  ...commonMenuList,
  {
    key: "/main/api-pages/traffic",
    label: "流量",
  },
  {
    key: "/main/api-pages/connect-test",
    label: "api调试",
  },
];

const sdkMenuList = [
  ...commonMenuList,
  {
    key: "/main/sdk-pages/download",
    label: "sdk下载",
  },
];

const MainPage = ({ children }: any) => {
  const [menus, setMenus] = useState<Array<IMeun>>([]);

  const router = useRouter();
  const updateUserInfo = useUserInfo((state: any) => state.updateUserInfo);

  useEffect(() => {
    getInitInfo();
  }, []);

  const getInitInfo = async () => {
    try {
      if (typeof window !== "undefined") {
        const data: any = await request.get("/user");
        const { type } = data;

        setMenus(type === 1 ? apiMenuList : sdkMenuList);
        updateUserInfo(data);
      }
    } catch (error: any) {
      const { status } = error?.response ?? {};
      console.log(error);
      if (status === 401) {
        router.replace("/login");
      }
    }
  };

  return (
    <WrapperContext.Provider value={{ menus }}>
      <Layout className="w-full h-screen">
        <PageSider />
        <Layout>
          <PageHeader />
          <Content className="w-full p-3 overflow-auto">
            <Suspense fallback={<Spin spinning={true} />}>
              <section className="w-full h-full bg-white">{children}</section>
            </Suspense>
          </Content>
          <Footer className="text-center bg-white px-1 py-2 border-solid border-t border-l border-[#f0f2f5]">
            Copyright {new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </WrapperContext.Provider>
  );
  return;
};

export default MainPage;
