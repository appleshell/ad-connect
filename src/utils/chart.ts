/**
 * 获取指标类别
 * */
export function getMetricNames(res = []) {
  return res.map((item: any) => item.name);
}
/**
 * 获取 x 轴时间
 * */
export function getMetricData(res = []) {
  if (res.length > 0) {
    return ((res[0] as any).points || []).map((item: any) => item.time);
  }
  return [];
}
/**
 * 获取折线数据
 * */
export function getMetricSeries(res = []) {
  return res.map((item: any) => ({
    name: item.name,
    type: "line",
    data: (item.points || []).map((innerItem: any) => innerItem.value),
  }));
}
