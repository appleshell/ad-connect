"use client";

import { useEffect, useState } from "react";
import { Tabs } from "antd";
import Image from "next/image";
import SmsCodeLogin from "./components/sms-code-login";
import AccountLogin from "./components/account-login";
import Register from "./components/register";
import { ballCanvas } from "./components/canvas-d";

const Login = () => {
  const [activeTab, setActiveTab] = useState("2");

  useEffect(() => {
    ballCanvas().start(6);
  }, []);

  const registerSuccess = () => {
    setActiveTab("2");
  };

  return (
    <section className="w-full h-screen relative">
      <div className="absolute h-screen left-0 top-0 overflow-hidden">
        <canvas id="myCanvas" width="1920" height="1080" />
      </div>
      <div className="absolute w-2/3 min-w-[920px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] opacity-95">
        <div className="flex items-center w-full h-[600px]">
          <img src="/assets/images/login_left.png" alt="" className="w-[70%] p-6" />

          <div className="flex-1">
            <div className="flex justify-center">
              <Image
                width={220}
                height={60}
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </div>
            <Tabs
              centered
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              items={[
                // { key: "1", label: "手机登录", children: <SmsCodeLogin /> },
                {
                  key: "2",
                  label: "登录 / Sign In",
                  children: <AccountLogin />,
                },
                {
                  key: "3",
                  label: "注册  / Sign Up",
                  children: <Register onSuccess={registerSuccess} />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
