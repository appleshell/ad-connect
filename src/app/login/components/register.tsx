import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import request from "@/utils/request";

const { Item: FormItem, useForm } = Form;

const userTypes = [
  { label: "使用api", value: 1 },
  { label: "使用sdk", value: 2 },
];

const Register = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: any) => {
    try {
      setLoading(true);
      const res: any = await request.post("/user/register", values);
      const { statusCode, message: msg } = res;
      if (!statusCode) {
        message.success("注册成功，请登录");
        onSuccess();
      } else {
        message.error(msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} size="large" onFinish={handleRegister}>
      <FormItem
        name="user_name"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input
          placeholder="请输入用户名"
          prefix={<UserOutlined />}
          allowClear
        />
      </FormItem>
      <FormItem
        name="email"
        rules={[
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确格式的邮箱" },
        ]}
      >
        <Input placeholder="请输入邮箱" prefix={<MailOutlined />} allowClear />
      </FormItem>
      <FormItem
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
      </FormItem>
      <FormItem
        name="check_passwork"
        rules={[
          { required: true, message: "请输入确认密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("两次输入的密码不匹配，请检查后再次输入");
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="请再次输入密码"
          prefix={<LockOutlined />}
        />
      </FormItem>
      <FormItem
        name="type"
        rules={[{ required: true, message: "请选择用户类型" }]}
      >
        <Select options={userTypes} placeholder="请选择用户类型" allowClear />
      </FormItem>
      <FormItem>
        <Button type="primary" block htmlType="submit" loading={loading}>
          注册
        </Button>
      </FormItem>
    </Form>
  );
};

export default Register;
