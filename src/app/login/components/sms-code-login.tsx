"use client";

import React, { useState } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { MobileOutlined, FileProtectOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSmsCodeCountdown } from "./util";
// import { menuRoutes, accountRoleTypeMap } from "src/routes";
// import { getInitPath, useAntiContent } from "src/utils/helpers";
// import { getVerifyToken, queryAccountInfo } from "../../service/common/auth";
// import { fetchSmsCode, createNewEvent } from "src/service/common/auth";

const { Item: FormItem, useForm } = Form;

const SmsCodeLogin = () => {
  const router = useRouter();
  const [form] = useForm();
  // const anti = useAntiContent();
  const [{ disabled, formatText }, handleRun] = useSmsCodeCountdown() as any;
  const [smsSign, setSmsSign] = useState("");

  const getSmsCode = async () => {
    try {
      const { mobile } = await form.validateFields(["mobile"]);
      // const response: any = await fetchSmsCode(
      //   { mobile, type: 0 },
      //   { ...anti }
      // );
      // const {
      //   data: { success, error_code, error_msg, result },
      // } = response;
      // if (success) {
      //   handleRun(60);
      //   setSmsSign(result);
      //   return;
      // }

      // if (error_code === 54001) {
      //   // 触发风控，进行人机校验
      //   const { verifyAuthToken } = result;
      //   const event = createNewEvent("FLOATING_CAPTCHA");
      //   Object.assign(event, {
      //     verifyAuthToken,
      //     captchaRetry: () => {},
      //     captchaCallback: ({ verifyAuthToken }) => {
      //       /**
      //        * 人机验证成功
      //        * */
      //       try {
      //         window.sessionStorage.setItem(
      //           "VERIFY_AUTH_TOKEN",
      //           verifyAuthToken
      //         );
      //         getSmsCode();
      //       } catch (error) {
      //         console.log(error);
      //       }
      //     },
      //   });

      //   window.dispatchEvent(event);
      //   console.log("触发人机校验", event);
      //   return;
      // }

      // if (error_code === 46002) {
      //   handleRun(30);
      //   message.error(error_msg);
      //   return;
      // }

      // message.error(error_msg);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    const loginData = await form.validateFields();
    const headers = {};
    // 获取token
    if (sessionStorage.getItem("VERIFY_AUTH_TOKEN")) {
      Object.assign(headers, {
        VerifyAuthToken: sessionStorage.getItem("VERIFY_AUTH_TOKEN"),
        // ...anti,
      });
    }
    const header = {
      headers: { ...headers },
      withCredentials: true,
    };
    router.push('/main/user')
    // const res = await getVerifyToken({ ...loginData, sign: smsSign }, header, {
    //   login,
    // });
    // if (res) {
    //   getPage();
    // }
  };

  /**
   * 登录之后根据后端返回的权限跳转页面
   * */
  // const getPage = async () => {
  //   try {
  //     const res = await queryAccountInfo({});
  //     const { type, account_name } = res;
  //     // const type = 1;
  //     localStorage.setItem("pageType", accountRoleTypeMap[type]);
  //     localStorage.setItem("AUTH_USER", account_name);
  //     const routeData = menuRoutes.filter((item: any) =>
  //       item.roles?.includes(accountRoleTypeMap[type])
  //     );
  //     const initPath: string = getInitPath(routeData);
  //     setTimeout(() => {
  //       router.push(initPath);
  //     }, 100);
  //   } catch (error) {
  //     console.log(error);
  //     localStorage.removeItem("pageType");
  //     message.warning("权限请求错误");
  //   }
  // };

  return (
    <Form form={form} size="large">
      <FormItem
        name="mobile"
        rules={[
          {
            validator(_: any, value) {
              if (/^1[0-9]{10}$/.test(value)) return Promise.resolve();
              return Promise.reject(new Error("请输入正确的手机号"));
            },
          },
        ]}
      >
        <Input placeholder="请输入手机号" prefix={<MobileOutlined />} />
      </FormItem>
      <FormItem
        name="verify_code"
        rules={[{ required: true, message: "请输入验证码" }]}
      >
        <Input
          placeholder="请输入验证码"
          prefix={<FileProtectOutlined />}
          addonAfter={
            <Button
              type="link"
              style={{ width: 100 }}
              disabled={disabled}
              onClick={getSmsCode}
              size="small"
            >
              {formatText}
            </Button>
          }
        />
      </FormItem>
      <Form.Item name="remember_me" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button block type="primary" onClick={login}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SmsCodeLogin;
