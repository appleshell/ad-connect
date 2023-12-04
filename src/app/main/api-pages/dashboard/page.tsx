"use client";

import React, { useRef, useEffect, useState } from "react";
import { message, Button, Form as AntdForm, DatePicker, Select } from "antd";
import { useSearchParams } from "next/navigation";
import { Store } from "antd/es/form/interface";
import dayjs from "dayjs";
import qs from "qs";
// import { CompositeSearch } from "@afe/sakura-common-ui";
import TableLayout from "@/components/TableLayout";
import Form from "@/components/Form";
// import {
//   fetchDataReport,
//   fetchListMetricEnums,
//   fetchAdPosIds,
// } from "src/service/media-config";
// import { useDictData } from "../utils";
import ReportChart from "./components/report-chart";
import ReportTable from "./components/report-table";
import { platformOptions, adLocationTypeOptions } from "./enum";
import GrowCard from "./components/GrowCard";
// import { switchOptionToMap } from "@/utils/helper";

const { useForm } = AntdForm;
const { RangePicker } = DatePicker;

const DataReport = () => {
  const searchParams = useSearchParams();
  // const { date, location_type, ad_pos_ids }: any = searchParams.getAll();
  const date = searchParams.get("date");
  const location_type = searchParams.get("location_type");
  const ad_pos_ids = searchParams.get("ad_pos_ids");
  const [form] = useForm();
  const searchRef = useRef<any>();
  // const { bid_type = [] } = useDictData();
  // const [locationDescOptions, setLocationDescOptions] = useState([]);
  const [adPosIdOptions, setAdPosIdOptions] = useState([]);
  const [metricOptions, setMetricOptions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableSumData, setTableSumData] = useState({});
  const [metrics, setMetrics] = useState<Array<any>>([]);

  // const BidTypeMap = switchOptionToMap(bid_type);

  const handleAdTypeChange = (v: Array<any>) => {
    // searchRef.current.resetFields(["ad_pos_ids"]);
    queryAdPosList(v);
  };

  const itemList = [
    {
      name: "report_time",
      label: "统计时间",
      render: () => <RangePicker allowClear />,
    },
    {
      name: "platforms",
      label: "系统平台",
      render: () => (
        <Select
          allowClear
          mode="multiple"
          placeholder="请选择"
          options={platformOptions}
        />
      ),
      rules: [{ required: true, message: "系统平台不能为空" }],
    },
    {
      // name: 'location_descs',
      name: "location_types",
      label: "广告样式",
      render: () => (
        <Select
          allowClear
          options={adLocationTypeOptions}
          placeholder="请选择"
          mode="multiple"
          onChange={handleAdTypeChange}
        />
      ),
      rules: [{ required: true, message: "请选择广告样式" }],
    },
    {
      name: "ad_pos_ids",
      label: "广告位id",
      render: () => (
        <Select
          allowClear
          options={adPosIdOptions}
          placeholder="请选择"
          mode="multiple"
          maxTagCount="responsive"
        />
      ),
      rules: [{ required: true, message: "请选择广告位id" }],
    },
  ];

  useEffect(() => {
    queryDicts();
    // queryAdPosList(location_type ? [location_type] : undefined);
  }, []);

  const queryDicts = async () => {
    const allLocationTypes = adLocationTypeOptions.map(
      (item: any) => item.value
    );
    const [metricsEnumsRes, adPosIdRes] = await Promise.all([
      // fetchListMetricEnums({}),
      // fetchAdPosIds({
      //   location_types: location_type ? [location_type] : allLocationTypes,
      // }),
      Promise.resolve([]),
      Promise.resolve([]),
    ]);

    const options: any = (adPosIdRes || []).map((item: any) => ({
      value: item,
      label: item,
    }));
    setAdPosIdOptions(options);
    setMetricOptions(metricsEnumsRes);

    const initMetrics = metricsEnumsRes
      .slice(0, 1)
      .map((item: any) => item.value);
    setMetrics(initMetrics);

    // if (options?.length) {
    // }
    // searchRef.current.setFieldsValue({
    //   // location_descs: location_desc ? [location_desc] : options.map((item) => item.value), // url上有参数，则设置url参数为默认值
    //   location_types: location_type ? [location_type] : allLocationTypes, // url上有参数，则设置url参数为默认值，默认全量数据
    //   ad_pos_ids: ad_pos_ids
    //     ? (ad_pos_ids as string).split(",")
    //     : options.map((item: any) => item.value),
    // });
    queryReportData({ metrics: initMetrics });
  };

  const queryAdPosList = async (types: Array<any> = []) => {
    if (!types.length) return;
    try {
      // const res = await fetchAdPosIds({ location_types: types });
      const res = await Promise.resolve([]);
      const options: any = (res || []).map((item: any) => ({
        value: item,
        label: item,
      }));
      setAdPosIdOptions(options);
    } catch (error) {
      console.log(error);
    }
  };

  const getParams = async () => {
    const { report_time, ...restFields } = await form.validateFields();
    const [start, end] = report_time;

    return {
      start_date: start.format("YYYY-MM-DD"),
      end_date: end.format("YYYY-MM-DD"),
      ...restFields,
    };
  };

  // 查询报表数据
  const queryReportData = async (restParams = {}) => {
    try {
      const params = await getParams();
      // const { chart, ads_data, sum } = await fetchDataReport({
      //   ...params,
      //   tag: 1,
      //   metrics,
      //   ...restParams,
      // });
      const { chart, ads_data, sum }: any = await Promise.resolve({});
      setChartData(chart);
      setTableData(ads_data);
      setTableSumData(sum);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMetricsChange = async (v: Array<any>) => {
    setMetrics(v);
    if (!v?.length) {
      return message.warning("指标不能为空");
    }
    queryReportData({ metrics: v });
  };

  const refresh = async () => {
    queryReportData();
  };

  const searchPorps: any = {
    itemList,
    // mount: (_) => (searchRef.current = _),
    columns: 4,
    onSearch: refresh,
    onReset: refresh,
    initialValues: {
      report_time: [dayjs(date as string).subtract(7, "days"), dayjs()],
      platforms: ["android", "ios"],
    },
  };

  return (
    <TableLayout>
      <GrowCard />
      <ReportChart
        data={chartData}
        metrics={metrics}
        metricOptions={metricOptions}
        metricsChange={handleMetricsChange}
      />
      <Form
        items={itemList}
        form={form}
        layoutCol={{
          span: 6,
          xs: 12,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 6,
        }}
        // eslint-disable-next-line no-console
        onFinish={(values: Store) =>
          new Promise((resolve) => {
            setTimeout(() => {
              // eslint-disable-next-line no-console
              console.log("BaseDemo", values);
              resolve(values);
            }, 1000);
          })
        }
      >
        <Button type="primary" htmlType="submit" className="float-right">
          提交
        </Button>
      </Form>
      <ReportTable data={tableData} sumData={tableSumData} />
    </TableLayout>
  );
};

export default DataReport;
