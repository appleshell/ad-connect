"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Select } from "antd";
import TableCom, { TableRef } from "@/components/TableCom";
// import { fetchFlowInfoList, fetchFlowTypes } from 'src/service/flow-info';
import InfoAddModal from "./info-add-modal";
import request from "@/utils/request";

const FlowInfo = () => {
  const tableRef = useRef<TableRef>();
  const [flowTypeOptions, setFlowTypeOptions] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [editData, setEditData] = useState();
  const itemList = [
    {
      label: "流量类型",
      name: "traffic_type",
      render: () => (
        <Select
          placeholder="请选择"
          allowClear
          showSearch
          optionFilterProp="label"
          options={flowTypeOptions}
        />
      ),
    },
    {
      name: "app_name",
      label: "APP名称",
    },
  ];
  const columns = [
    {
      title: "流量类型",
      dataIndex: "traffic_type",
    },
    {
      title: "APP名称",
      dataIndex: "app_name",
    },
    {
      title: "包名",
      dataIndex: "app_package",
    },
    {
      title: "DAU(万)",
      dataIndex: "dau",
    },
    {
      title: "日均请求量级(万)",
      dataIndex: "request_daily",
    },
    {
      title: "修改",
      dataIndex: "operate",
      render: (_: never, r: any) => (
        <Button type="link" onClick={() => editFlowInfo(r)}>
          修改
        </Button>
      ),
    },
  ];

  useEffect(() => {
    queryFlowTYpes();
  }, []);

  const queryFlowTYpes = async () => {
    try {
      const res = await Promise.resolve([
        { label: "文案", value: 1 },
        { label: "图片", value: 1 },
        { label: "视频", value: 2 },
      ]);
      setFlowTypeOptions(res);
    } catch (error) {
      console.log(error);
    }
  };

  const queryDataList = async (formValue: any, pagination: any) => {
    try {
      const { current, pageSize } = pagination;
      // const {
      //   items,
      //   pagination: { total },
      // } = await Promise.resolve({ ...formValue, current, page_size: pageSize });
      const data:any = await request.get("/app/list");
      setDataSource(data || []);
      setTotal(data?.length || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const addFlowInfo = () => {
    setEditData(undefined);
    setInfoModalVisible(true);
  };

  const editFlowInfo = (data: any) => {
    setEditData(data);
    setInfoModalVisible(true);
  };

  const onAddOk = () => {
    tableRef.current?.refresh();
    setInfoModalVisible(false);
  };

  const renderOperate = () => {
    return (
      <Button type="primary" onClick={addFlowInfo}>
        新增APP信息
      </Button>
    );
  };

  return (
    <>
      <TableCom
        tableSearchProps={{ items: itemList }}
        tableProps={{
          columns,
          dataSource,
          queryData: queryDataList,
          pagination: { total },
        }}
        operateCom={renderOperate()}
        ref={tableRef as any}
      />
      <InfoAddModal
        visible={infoModalVisible}
        onOk={onAddOk}
        onCancel={() => setInfoModalVisible(false)}
        flowTypeOptions={flowTypeOptions}
        editData={editData}
      />
    </>
  );
};

export default FlowInfo;
