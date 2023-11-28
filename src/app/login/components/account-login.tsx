"use client";
import React, { useState } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/config/http";
// import { useNavigate } from 'react-router-dom';
import md5 from "md5";
// import { menuRoutes, accountRoleTypeMap } from "src/routes";
// import { getInitPath } from "src/utils/helpers";
// import { getVerifyToken, queryAccountInfo } from "../../service/common/auth";

const { Item: FormItem, useForm } = Form;

const AccountLogin = () => {
  const [form] = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const login = async (values: any) => {
    try {
      setLoading(true);
      const { data }: any = await axios.post(`${BASE_URL}/auth/login`, values);
      localStorage.setItem("AUTH_USER", data.user_id);
      router.push("main/");
    } catch (error: any) {
      const {
        response: { data },
      } = error;
      message.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} size="large" onFinish={login}>
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
      {/* <Form.Item name="remember_me" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
      </Form.Item> */}
      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountLogin;
