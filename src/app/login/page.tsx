"use client";

import { useEffect } from "react";
import { Tabs } from "antd";
import Image from "next/image";
import SmsCodeLogin from "./components/sms-code-login";
import AccountLogin from "./components/account-login";
import { ballCanvas } from "./components/canvas-d";

const Login = () => {
  useEffect(() => {
    ballCanvas().start(6);
  }, []);
  return (
    <section className="w-full h-screen relative">
      <div className="absolute h-screen left-0 top-0 overflow-hidden">
        <canvas id="myCanvas" width="1920" height="1080" />
      </div>
      <div className="absolute w-1/4 min-w-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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
          items={[
            { key: "1", label: "手机登录", children: <SmsCodeLogin /> },
            { key: "2", label: "账号密码登录", children: <AccountLogin /> },
          ]}
        />
      </div>
    </section>
  );
};

export default Login;
