"use client";

import React, { useEffect, useMemo, useState, useContext } from "react";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import { menuRoutes } from "src/routes";
import { getPathByKey } from "@/utils/helper";
import WrapperContext from "@/app/main/wrapperContext";

const { Header, Sider } = Layout;

const PageSider = () => {
  // const [routeLists, setRouteLists] = useState(menuList);
  const { menus } = useContext(WrapperContext);
  const pathname = usePathname();
  const navigate = useRouter();

  useEffect(() => {
    getAccountInfo();
  }, []);

  const activeKeys = useMemo(() => {
    const pathList = getPathByKey(pathname, menus);
    return pathList.map((item) => item.key);
  }, [pathname, menus]);

  const getAccountInfo = async () => {
    // const accountType = window.localStorage.getItem("pageType");
    try {
      // const routes = menuRoutes.filter((item) =>
      //   item.roles?.includes(accountType)
      // );
      // setRouteLists(routes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuSelect = ({ key }: { key: string }) => {
    navigate.push(key);
  };

  return (
    <Sider style={{ backgroundColor: "#fff" }} className="h-screen">
      <Header className="px-5">
        <img src="/ad/assets/images/logo-white.svg" alt="logo" className="w-full" />
      </Header>
      <Menu
        className="sider-menu"
        mode="inline"
        defaultSelectedKeys={activeKeys}
        defaultOpenKeys={activeKeys}
        selectedKeys={activeKeys}
        onSelect={handleMenuSelect}
        items={menus}
      />
    </Sider>
  );
};

export default PageSider;
