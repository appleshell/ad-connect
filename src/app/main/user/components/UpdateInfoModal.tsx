import React from "react";
import { Modal, Select } from "antd";
import Form from "@/components/Form";
import { useDicts } from "@/hooks";
import request from "@/utils/request";

interface IProps {
  onOk: () => void;
  open: boolean;
  onCancel: () => void;
  userInfo: any;
}

const { useForm } = Form;

const UpdateInfoModal = ({ onOk, open, onCancel, userInfo }: IProps) => {
  const userTypes = useDicts((state: any) => state.userTypes);

  const itemList = [
    {
      name: "user_name",
      label: "用户名",
      rules: [{ required: true, message: "请输入" }],
    },
    {
      name: "email",
      label: "邮箱",
      disabled: true,
    },
    {
      name: "type",
      label: "账户类型",
      rules: [{ required: true, message: "请选择" }],
      disabled: true,
      render: () => (
        <Select options={userTypes} placeholder="请选择" allowClear />
      ),
    },
  ];

  const [form] = useForm();

  const handleOk = async () => {
    try {
      const params = await form.validateFields();
      const res = await request.put("/user", {
        ...userInfo,
        id: userInfo._id,
        ...params,
      });
      console.log(res);
      onOk();
    } catch (error) {}
  };

  return (
    <Modal
      title="修改信息"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={userInfo}
        labelCol={{ span: 4 }}
        items={itemList}
      />
    </Modal>
  );
};

export default UpdateInfoModal;
