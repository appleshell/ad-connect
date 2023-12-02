"use client";

import React, { useEffect, useState, useContext } from "react";
import { Descriptions, Space, Button } from "antd";
import WrapperContext from "../wrapperContext";
// import { fetchAccountInfo } from 'src/service/account-info';
// import { queryAccountInfo } from 'src/service/common/auth';
// import UpdateMobile from './update-mobile-modal';
// import UpdatePassword from './update-password-modal';

const useTypeMap: any = {
  1: "使用API",
  2: "使用SDK",
};

const AccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState<any>({});
  const {
    userInfo: { user_name, email, type },
  } = useContext(WrapperContext);

  useEffect(() => {
    getAccountInfo();
  }, []);

  const getAccountInfo = async () => {
    // try {
    //   const res = await queryAccountInfo({});
    //   console.log(res);
    //   setAccountInfo(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleUpdateOk = () => {
    getAccountInfo();
  };

  return (
    <Descriptions column={1} style={{ padding: 20 }}>
      <Descriptions.Item label="账户名称">{user_name}</Descriptions.Item>
      <Descriptions.Item label="注册邮箱">
        <span>{email}</span>
        {/* <UpdateMobile accountInfo={accountInfo} onOk={handleUpdateOk} /> */}
      </Descriptions.Item>
      <Descriptions.Item label="账户类型">{useTypeMap[type]}</Descriptions.Item>
      {/* <Descriptions.Item label="账户密码">
        <UpdatePassword />
      </Descriptions.Item> */}
    </Descriptions>
  );
};

export default AccountInfo;
