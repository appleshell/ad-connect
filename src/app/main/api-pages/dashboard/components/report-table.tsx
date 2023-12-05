import React, { useEffect, useState } from "react";
import { Table, Statistic, Card, Row, Col } from "antd";
import { TablePaginationConfig } from "antd/lib/table/interface";

const columns = [
  {
    title: "日期",
    dataIndex: "date",
  },
  // 暂时没有数据，不展示
  // {
  //   title: '应用ID',
  //   dataIndex: 'app_id',
  // },
  // {
  //   title: '应用名称',
  //   dataIndex: 'app_name',
  // },
  {
    title: "广告位ID",
    dataIndex: "ad_pos_id",
  },
  // {
  //   title: '广告位名称',
  //   dataIndex: 'ad_pos_name',
  // },
  {
    title: "广告位类型",
    dataIndex: "location_type",
  },
  // {
  //   title: '资源位',
  //   dataIndex: 'location_desc',
  // },
  {
    title: "展现量",
    dataIndex: "deduplicate_views",
  },
  {
    title: "点击量",
    dataIndex: "deduplicate_clicks",
  },
  {
    title: "点击率",
    dataIndex: "ctr",
    render: (v: number) => `${(v * 100).toFixed(2)}%`,
  },
  // {
  //   title: "CPM",
  //   dataIndex: "cpm",
  // },
  {
    title: "预期收益(元)",
    dataIndex: "rbtcost",
  },
];

const ReportTable = ({ data = [], sumData = {} as any }) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    total: 0,
    pageSize: 10,
    pageSizeOptions: ["10", "20", "50", "100"],
    showSizeChanger: true,
  });

  const [tableData, setTableData] = useState<any[]>([]);

  const getTableData = (arr: any[], index: number, size: number): any[] => {
    const offset = (index - 1) * size;
    return offset + size >= arr.length
      ? arr.slice(offset, arr.length)
      : arr.slice(offset, offset + size);
  };

  const handleTableChange = (pageData: TablePaginationConfig) => {
    setPagination({ ...pagination, ...pageData });
    const list = getTableData(
      data,
      pageData.current as number,
      pageData.pageSize as number
    );
    setTableData(list);
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      total: data.length,
    });
    const list = getTableData(data, 1, 10);
    setTableData(list);
  }, [data]);
  return (
    <Card title="数据明细" bordered={false} className="com-report-table">
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={handleTableChange}
        pagination={pagination}
      />
    </Card>
  );
};

export default ReportTable;
