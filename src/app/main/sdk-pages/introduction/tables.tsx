import React from "react";
import { Table } from "antd";

export const AndroidTable = () => {
  const columns = [
    {
      title: "字段",
      dataIndex: "field",
      width: 150,
    },
    {
      title: "说明",
      dataIndex: "introduction",
    },
  ];

  const dataSource = [
    {
      field: "应用下载链接",
      introduction: "点击后可以直接唤起APK应用包下载的链接，即为APK链接。",
    },
    {
      field: "程序包名",
      introduction: "应用商店中的程序包名",
    },
    {
      field: "行业",
      introduction: "请根据实际应用信息选择，行业信息是预估模型中的关键字段",
    },
    {
      field: "应用名称",
      introduction: "由开发者命名",
    },
    {
      field: "应用SHA1值",
      introduction: "可使用SHA1值工具上传apk取Hex值",
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered={true}
    />
  );
};

export const IOSTable = () => {
  const columns = [
    {
      title: "字段",
      dataIndex: "field",
      width: 150,
    },
    {
      title: "说明",
      dataIndex: "introduction",
    },
  ];

  const dataSource = [
    {
      field: "APP ID",
      introduction: "应用在APP Store上的ID",
    },
    {
      field: "程序包名",
      introduction: "应用商店中的程序包名",
    },
    {
      field: "行业",
      introduction: "请根据实际应用信息选择，行业信息是预估模型中的关键字段",
    },
    {
      field: "应用名称",
      introduction: "由开发者命名",
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered={true}
    />
  );
};

export const AppAuditTable = () => {
  const columns = [
    {
      title: "状态",
      dataIndex: "status",
      width: 150,
    },
    {
      title: "说明 和 todo",
      dataIndex: "introduction",
    },
  ];

  const dataSource = [
    {
      status: "校验失败",
      introduction: "新增应用信息填写有误，请排查后重新填写",
    },
    {
      status: "运行中",
      introduction: "审核通过，可以开始下一步的广告位创建",
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered={true}
    />
  );
};

export const DisplayRenderTable = () => {
  const columns = [
    {
      title: "广告样式",
      dataIndex: "field",
      width: 150,
    },
    {
      title: "渲染方式",
      dataIndex: "introduction",
    },
  ];

  const dataSource = [
    {
      field: "开屏",
      introduction: "SDK渲染",
    },
    {
      field: "信息流",
      introduction: "SDK渲染 & 自渲染",
    },
    {
      field: "激励视频",
      introduction: "SDK渲染",
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered={true}
    />
  );
};
