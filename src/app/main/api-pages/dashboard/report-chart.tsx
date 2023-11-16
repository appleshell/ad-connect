import React, { ChangeEvent } from "react";
import { Card, Select } from "antd";
import ReactEcharts from "echarts-for-react";
import { getMetricNames, getMetricData, getMetricSeries } from "@/utils/chart";

const getOption = (data = []) => ({
  grid: {
    left: "1%",
    right: "2%",
    bottom: "4%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: getMetricNames(data),
  },
  toolbox: {
    right: 14,
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: getMetricData(data),
  },
  yAxis: {
    type: "value",
  },
  series: getMetricSeries(data),
});

const ReportChart = ({
  data = [],
  metricOptions = [],
  metricsChange,
  metrics,
}: any) => {
  const handleMetricsChange = (v: ChangeEvent) => {
    metricsChange(v);
  };

  return (
    <Card title="数据报表">
      <div>
        <span>指标：</span>
        <Select
          style={{ width: 300 }}
          options={metricOptions}
          value={metrics}
          onChange={handleMetricsChange}
          mode="multiple"
        />
      </div>
      <ReactEcharts
        style={{ height: "300px", width: "100%" }}
        notMerge
        lazyUpdate
        option={getOption(data)}
      />
    </Card>
  );
};

export default ReportChart;
