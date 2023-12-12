"use client";

import React, { useEffect, useState, useContext } from "react";
import { Descriptions, Space, Button } from "antd";
import { useUserInfo } from "@/hooks";
import UpdateInfoModal from "./components/UpdateInfoModal";
import request from "@/utils/request";

// import { fetchAccountInfo } from 'src/service/account-info';
// import { queryAccountInfo } from 'src/service/common/auth';
// import UpdateMobile from './update-mobile-modal';
// import UpdatePassword from './update-password-modal';

const userTypeMap: any = {
  1: "使用API",
  2: "使用SDK",
};

const AccountInfo = () => {
  const { userInfo, updateUserInfo } = useUserInfo((state: any) => state);
  const [open, setOpen] = useState(false);

  const getAccountInfo = async () => {
    try {
      const data: any = await request.get(`/user/${userInfo._id}`);
      updateUserInfo(data);
      closeUpdateModal();
    } catch (error) {
      console.log(error);
    }
  };

  const closeUpdateModal = () => setOpen(false);

  const handleUpdateOk = () => {
    getAccountInfo();
  };

  return (
    <>
      <Descriptions column={1} style={{ padding: 20 }}>
        <Descriptions.Item label="账户名称">
          {userInfo.user_name}
        </Descriptions.Item>
        <Descriptions.Item label="注册邮箱">
          <span>{userInfo.email}</span>
        </Descriptions.Item>
        <Descriptions.Item label="账户类型">
          {userTypeMap[userInfo.type]}
        </Descriptions.Item>
        {/* <Descriptions.Item label="账户密码">
        <UpdatePassword />
      </Descriptions.Item> */}
      </Descriptions>
      <Button type="primary" className="ml-5" onClick={() => setOpen(true)}>
        更新信息
      </Button>
      <UpdateInfoModal
        open={open}
        onCancel={closeUpdateModal}
        onOk={handleUpdateOk}
        userInfo={userInfo}
      />
    </>
  );
};

export default AccountInfo;
