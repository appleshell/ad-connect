import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, InputNumber, Alert } from "antd";
// import { submitFlowInfo, submitEditFlowInfo } from 'src/service/flow-info';

const { Item: FormItem, useForm } = Form;
const commonRules = [{ required: true, message: "不能为空" }];

const InfoAddModal = ({
  visible,
  onOk,
  onCancel,
  flowTypeOptions = [],
  editData,
}: any) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && editData) {
      initEditData();
    }
  }, [visible]);

  const initEditData = () => {
    form.setFieldsValue(editData);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const parmas = await form.validateFields();
      // if (editData) {
      //   await submitEditFlowInfo({ ...editData, ...parmas });
      //   onOk();
      // } else {
      //   await submitFlowInfo(parmas);
      //   onOk();
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={editData ? "修改信息" : "新增信息"}
      visible={visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={onCancel}
      width={600}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} labelCol={{ span: 6 }}>
        <FormItem label="流量类型" name="traffic_type" rules={commonRules}>
          <Select options={flowTypeOptions} allowClear />
        </FormItem>
        <FormItem label="APP名称" name="app_name" rules={commonRules}>
          <Input />
        </FormItem>
        <FormItem label="包名" name="package_name" rules={commonRules}>
          <Input />
        </FormItem>
        <FormItem label="DAU(万)" name="dua" rules={commonRules}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </FormItem>
        <FormItem label="日均请求量级(万)" name="req_day" rules={commonRules}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default InfoAddModal;
