"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import dynamic from "next/dynamic";
import { isJSON } from "@/utils/helper";
// import { fetchChannelToken } from "src/service/media-config";
// import { fetchAdsDebug } from "src/service/interface-test";
import ResExplain from "./res-explain";

const JsonInput = dynamic(() => import("./json-input"), { ssr: false });

const { Item: FormItem, useForm } = Form;

const InterfaceTest = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    queryToken();
  }, []);

  const queryToken = async () => {
    try {
      // const { adx_id } = await fetchChannelToken();
      const { adx_id } = await Promise.resolve({ adx_id: 1 });
      form.setFieldsValue({ sub_channel: adx_id });
    } catch (error) {
      console.log(error);
    }
  };

  const getFormValues = async () => {
    const { sub_channel, request = "{}" } = await form.validateFields();

    return { sub_channel, request };
  };

  const sengReq = async () => {
    try {
      setLoading(true);
      const value = await getFormValues();
      // const res = await fetchAdsDebug(value);
      const res = await Promise.resolve(value);

      form.setFieldsValue({ response: JSON.stringify(res, null, "\t") });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-4 mx-auto bg-white">
      <Row>
        <Col span={10}>
          <ResExplain />
        </Col>
        <Col span={14}>
          <Form form={form} labelCol={{ span: 3 }} style={{ width: "100%" }}>
            <FormItem label="adx_id" name="sub_channel">
              <Input disabled />
            </FormItem>
            <FormItem
              label="请求数据"
              name="request"
              rules={[
                {
                  validator: (_, value) =>
                    isJSON(value)
                      ? Promise.resolve()
                      : Promise.reject("请输入正确的JSON格式"),
                },
              ]}
            >
              {/* <JsonInput /> */}
              <Input.TextArea rows={10} />
            </FormItem>
            <FormItem wrapperCol={{ offset: 4, span: 6 }}>
              <Button type="primary" onClick={sengReq} loading={loading}>
                发送请求
              </Button>
            </FormItem>
            <FormItem label="返回数据" name="response">
              <Input.TextArea rows={10} />
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default InterfaceTest;
