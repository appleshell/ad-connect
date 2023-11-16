"use client";
import React from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
// import { useNavigate } from 'react-router-dom';
import md5 from "md5";
// import { menuRoutes, accountRoleTypeMap } from "src/routes";
// import { getInitPath } from "src/utils/helpers";
// import { getVerifyToken, queryAccountInfo } from "../../service/common/auth";

const { Item: FormItem, useForm } = Form;

const AccountLogin = () => {
  const [form] = useForm();
  const router = useRouter();
  // const navigate = useNavigate();

  const login = async () => {
    const { password, ...restLoginData } = await form.validateFields();
    const headers = {};
    // 获取token
    // if (sessionStorage.getItem("VERIFY_AUTH_TOKEN")) {
    //   Object.assign(headers, {
    //     VerifyAuthToken: sessionStorage.getItem("VERIFY_AUTH_TOKEN"),
    //   });
    // }
    // const header = {
    //   headers,
    //   withCredentials: true,
    // };
    const res = await Promise.resolve({ user_code: password }); // 1--api用户，2--sdk用户
    localStorage.setItem("AUTH_USER", res.user_code);
    router.push("main/");
    // const res = await getVerifyToken(
    //   { ...restLoginData, password: md5(`${password}amiibo`).toUpperCase() },
    //   header,
    //   {
    //     login,
    //   }
    // );
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
  //       // navigate(initPath);
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
        name="user_name"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
      </FormItem>
      <FormItem
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
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

export default AccountLogin;
